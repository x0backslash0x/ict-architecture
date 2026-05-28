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
    response = httpx.get("http://localhost:3000/get_customer_data_by_email", params={'email': email})
    #response = httpx.get("http://customers:3000/get_customer_data_by_email", params={'email': email})
    return response.json()

def retrieve_order_data(secret: str) -> dict:
    response = httpx.get("http://localhost:3001/get_order_data")
    #response = httpx.get("http://orders:3000/get_order_data")
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
        customer_name = customer_data.get("first_name")
        orders_data = retrieve_order_data(secret)
        orders = []
        for order in orders_data:
            if order.get('customer_id') == customer_data.get('id'):
                orders.append(order)
        customer_summary = {
            "customer": customer_name,
            "orders": orders,
        }
        return customer_summary


""" @app.get("/orders")
def get_orders(secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    else:
        update_rate(secret)

    if hits_rate_limit(secret):
        return "rate limit exceeded"
    else:
        #response = httpx.get("http://localhost:3001/get_order_data")
        response = httpx.get("http://orders:3000/get_order_data")
        return response.json() """


""" @app.get("/products")
def get_products(secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    else:
        update_rate(secret)

    if hits_rate_limit(secret):
        return "rate limit exceeded"
    else:
        #response = httpx.get("http://localhost:3002/get_product_data")
        response = httpx.get("http://products:3000/get_product_data")
        return response.json() """
