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


@app.get("/customers")
def get_customers(email: str, secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    else:        
        update_rate(secret)

    if hits_rate_limit(secret):
        return "rate limit exceeded"
    else:
        response = httpx.get("http://customers:3000/get_customer_data_by_email", params={'email': email})
        return response.json()


@app.get("/orders")
def get_orders(secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    else:
        update_rate(secret)

    if hits_rate_limit(secret):
        return "rate limit exceeded"
    else:
        response = httpx.get("http://orders:3000/get_order_data")
        return response.json()


@app.get("/products")
def get_products(secret: str):
    if not is_valid_secret(secret):
        return "secret required"
    else:
        update_rate(secret)

    if hits_rate_limit(secret):
        return "rate limit exceeded"
    else:
        response = httpx.get("http://products:3000/get_product_data")
        return response.json()
