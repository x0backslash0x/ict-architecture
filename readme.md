Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 8 (bis jaar)
## Gebruik
| Service | endpoint |
| ------- | -------- |
| customers | localhost:3000/get_customer_data_by_email?email=\<email\> |
| orders | localhost:3001/get_order_data |
| products | localhost:3002/get_product/data |
| gateway/customers | localhost:3003/customers |
| gateway/orders | localhost:3003/orders |
| gateway/products | localhost:3003/products |

**omgeving klaar zetten**
```bash
docker compose build
docker compose up
```

**services aanroepen**
```bash
curl localhost:3003/customers
curl localhost:3003/orders
curl localhost:3003/products
```