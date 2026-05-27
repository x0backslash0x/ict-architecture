#gateway.py
from fastapi import FastAPI
import httpx
import time

app = FastAPI()

VALID_SECRETS =  {"plankton", "chair", "bycicle"}
VALID_SECRETS =  {"plankton": None, "chair": None, "bycicle": None}
RATE_LIMIT = 1 # moet uiteindelijk 2 worden
WINDOW_SECONDS = 60

def is_valid_secret(secret: str) -> bool:
    if secret in VALID_SECRETS:
        return True
    return False

# gaat er impliciet van uit dat RATE_LIMIT == 1
# zal moeten uigebreid worden om hogere rate limits te controleren
def hits_rate_limit(secret: str) -> bool:
    now = time.time()
    last_seen = VALID_SECRETS[secret]
    VALID_SECRETS[secret] = now

    if last_seen == None:
        return False
    if (now - last_seen) > WINDOW_SECONDS:
        return False
    return True

@app.get("/customers")
def get_customers(secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    if hits_rate_limit(secret):
        return "rate limit exceeded"
    response = httpx.get("http://customers:3000/get_customer_data_by_email", params={'email': 'rsands0@dell.com'})
    return response.json()
    customer_data = "customer data"
    return customer_data

@app.get("/orders")
def get_orders(secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    if hits_rate_limit(secret):
        return "rate limit exceeded"
    response = httpx.get("http://orders:3000/get_order_data")
    return response.json()
    order_data = "order data"
    return order_data

@app.get("/products")
def get_products(secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    if hits_rate_limit(secret):
        return "rate limit exceeded"
    response = httpx.get("http://products:3000/get_product_data")
    return response.json()
    product_data = "product data"
    return product_data
