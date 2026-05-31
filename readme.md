Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 8 (bis jaar)
## Endpoints
**Customers service**

| method | endpoint |
| ------ | ------ |
| GET | localhost:3000/get_customer_data_by_email?email= |
| POST | localhost:3000/add_customer_data?id=&first_name=&last_name=&email= |
| PUT | localhost:3000/update_customer_data_by_email?email=&new_id=&new_first_name=&new_last_name=&new_email= |
| DELETE | localhost:3000/remove_customer_data_by_email?email= |

**Orders service**
| method | endpoint |
| ------ | ------ |
| GET | localhost:3001/get_order_data |
| POST | localhost:3001/add_order_data?product_id=&customer_id= |
| PUT | localhost:3001update_order_data_by_date?date=&new_product_id=&new_customer_id= |
| DELETE | localhost:3001/remove_order_data_by_date?date= |

**Products service**
| method | endpoint |
| ------ | ------ |
| GET | localhost:3002/get_product_data |
| POST | localhost:3002/add_product_data?product_id&description=&price= |
| PUT | localhost:3002/update_product_data_by_id?product_id&new_description=&new_price= |
| DELETE | localhost:3002/add_product_data_by_id?product_id= |

**API Gateway**
| method | endpoint |
| ------ | ------ |
| GET | localhost:3003/customers?email=&secret= |
| GET | localhost:3003/orders?secret= |
| GET | localhost:3003/products?secret=\ |

## Gebruik
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