Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 8 (bis jaar)
## Gebruik
| Service | endpoint |
| ------- | -------- |
| customers | localhost:3000/get_customer_data_by_email?email=\<email\> |
| orders | localhost:3001/get_order_data |
| products | localhost:3002/get_product/data |
| gateway/customers | localhost:3003/customers?secret=\<secret\> |
| gateway/orders | localhost:3003/orders?secret=\<secret\> |
| gateway/products | localhost:3003/products?secret=\<secret\> |

**omgeving klaar zetten**
```bash
docker compose build
docker compose up -d
docker build -t gateway ./gateway
docker run --rm -d --name gateway -p 3003:8000 --network labo208_default gateway
```

**services aanroepen**
```bash
curl localhost:3003/customers?secret=<secret>
curl localhost:3003/orders?secret=<secret>
curl localhost:3003/products?secret=<secret>
```
*Wanneer er een internal server error verschijnt, kan het zijn dat de services not niet beschikbaar zijn. Alle services moeten eerst volledig aktief zijn*