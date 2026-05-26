from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse, Response
import time
import httpx
from collections import defaultdict

app = FastAPI()

VALID_SECRETS = {"alpha-secret", "beta-secret", "gamma-secret"}
RATE_LIMIT = 2
WINDOW_SECONDS = 60

usage = defaultdict(list)

SERVICES = {
    "customers": "http://customers:3000/get_customer_data_by_email/",
    "orders": "http://orders:3001/get_order_data",
    "products": "http://products:3002/get_product/data",
}

def check_secret_and_rate_limit(request: Request):
    secret = request.headers.get("x-api-key")
    if secret not in VALID_SECRETS:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")

    now = time.time()
    usage[secret] = [t for t in usage[secret] if now - t < WINDOW_SECONDS]

    if len(usage[secret]) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    usage[secret].append(now)

@app.get("/{service_name}")
async def proxy_get(service_name: str, request: Request):
    check_secret_and_rate_limit(request)

    if service_name not in SERVICES:
        raise HTTPException(status_code=404, detail="Unknown service")

    target_url = SERVICES[service_name]

    async with httpx.AsyncClient() as client:
        backend_response = await client.get(target_url)

    return Response(
        content=backend_response.content,
        status_code=backend_response.status_code,
        media_type=backend_response.headers.get("content-type", "application/json")
    )