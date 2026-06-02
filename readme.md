Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 5 (bis jaar)
In dit labo worden enkele patronenen voor werken met messages overlopen ahv RabbitMQ tutorials.

**Tutorial 1 - Hello World**<br/>
![alt text](./info/labo205_tutorial1.png)


**Tutorial 2 - Work Queues**<br/>
![alt text](./info/labo205_tutorial2.png)

**Tutorial 3 - Publish/Subscribe**<br/>
![alt text](./info/labo205_tutorial3.png)

## Gebruik - Hello World
RabbitMQ server container opzetten

`docker compose up -d rabbitmq`

Python packages installeren

`pip install -r requirements.txt`

reciever starten (aparte terminal)

`python3 helloworld/receiver.py`

een bericht versturen

`python3 helloworld/sender.py`


Elke keer dat de zender (`sender.py`) wordt uitgevoerd stuurt deze een bericht naar de queue van de RabbitMQ server. De ontvanger (`receiver.py`) toont elk nieuw bericht dat op de queue aankomt.

**Voorbeeld**<br/>
![voorbeeld hello world](./info/labo205_hello-world_local.png)