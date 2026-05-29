#gateway.py
from fastapi import FastAPI
import httpx
import time

app = FastAPI()

VALID_SECRETS =  {"plankton": None, "chair": None, "bycicle": None}
RATES = {"plankton": 0, "chair": 0, "bycicle": 0}  # aantal x per minuut gebruikt
RATE_LIMIT = 2
WINDOW_SECONDS = 60


def is_valid_secret(secret: str) -> bool:
    return secret in VALID_SECRETS


def update_rate(secret: str):
    now = time.time()
    if VALID_SECRETS[secret] == None:
        VALID_SECRETS[secret] = now

    previous_limit = VALID_SECRETS[secret]
    if (now - previous_limit) < WINDOW_SECONDS:
        RATES[secret] += 1
    else:
        RATES[secret] = 1
        VALID_SECRETS[secret] = now


def hits_rate_limit(secret: str) -> bool:
    return RATES[secret] > RATE_LIMIT


def retrieve_customer_data(email: str, secret: str) -> dict:
    #response = httpx.get("http://localhost:3000/get_customer_data_by_email", params={'email': email})
    response = httpx.get("http://customers:3000/get_customer_data_by_email", params={'email': email})
    return response.json()


def retrieve_order_data(secret: str) -> dict:
    #response = httpx.get("http://localhost:3001/get_order_data")
    response = httpx.get("http://orders:3000/get_order_data")
    return response.json()


def retrieve_product_data(secret: str) -> dict:
    #response = httpx.get("http://localhost:3002/get_product_data")
    response = httpx.get("http://products:3000/get_product_data")
    return response.json()


@app.get("/customers")
def get_customers(email: str, secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    else:
        update_rate(secret)

    if hits_rate_limit(secret):
        return "rate limit exceeded"
    else:
        customer_data = retrieve_customer_data(email, secret)
        order_data = retrieve_order_data(secret)
        product_data = retrieve_product_data(secret)
        orders = []
        for order in order_data:
            if order.get('customer_id') == customer_data.get('id'):
                order_date = order.get('date')
                for product in product_data:
                    if product.get('id') == order.get('product_id'):
                        order_product_name = product.get('description')
                        order_product_price = product.get('price')
                        orders.append({
                            "date": order_date, "product": order_product_name, "price": order_product_price,})
    
        customer_name = customer_data.get("first_name")
        customer_summary = {
            "customer": customer_name,
            "orders": orders,
        }

        return customer_summary
