#gateway.py
from fastapi import FastAPI
import httpx

app = FastAPI()

@app.get("/customers")
def get_customers():
    response = httpx.get("http://customers:3000/get_customer_data_by_email", params={'email': 'rsands0@dell.com'})
    return response.json()
    customer_data = "customer data"
    return customer_data

@app.get("/orders")
def get_orders():
    response = httpx.get("http://orders:3000/get_order_data")
    return response.json()
    order_data = "order data"
    return order_data

@app.get("/products")
def get_products():
    response = httpx.get("http://products:3000/get_product_data")
    return response.json()
    product_data = "product data"
    return product_data
