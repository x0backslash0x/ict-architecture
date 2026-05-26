#gateway.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/customers")
def get_customers():
    customer_data = "customer data"
    return customer_data

@app.get("/orders")
def get_orders():
    order_data = "order data"
    return order_data

@app.get("/products")
def get_products():
    product_data = "product data"
    return product_data
