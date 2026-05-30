Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 8 (bis jaar)
## Endpoints
## Gebruik
| Service | method | endpoint |
| ------- | ------ | -------- |
| customers | get | localhost:3000/get_customer_data_by_email?email=\<email\> |
| customers | post | localhost:3000/add_customer_data?id=&first_name=&last_name=&email= |
| customers | put | localhost:3000/update_customer_data_by_email?email=&new_id=&new_first_name=&new_last_name=&new_email= |
| customers | delete | localhost:3000/remove_customer_data_by_email?email= |
| orders | get | localhost:3001/get_order_data |
| products | get | localhost:3002/get_product/data |
| gateway/customers | get | localhost:3003/customers?email=\<email\>&secret=\<secret\> |
| gateway/orders | get | localhost:3003/orders?secret=\<secret\> |
| gateway/products | get | localhost:3003/products?secret=\<secret\> |

**omgeving klaar zetten**
```bash
docker compose build
docker compose up -d
```

**services aanroepen**
```bash
curl localhost:3003/customers?email=<email>&secret=<secret>
curl localhost:3003/orders?secret=<secret>
curl localhost:3003/products?secret=<secret>
```
*Wanneer er een internal server error verschijnt, kan het zijn dat de services not niet beschikbaar zijn. Alle services moeten eerst volledig aktief zijn*