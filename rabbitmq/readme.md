# RabbitMQ tutorials
[tutorial 1: Hello World](https://www.rabbitmq.com/tutorials/tutorial-one-python)
[tutorial 2: Work queues](https://www.rabbitmq.com/tutorials/tutorial-two-python) 

## Info
Message acknowledgement is on by default (auto_ack)
Message durability: queue will survive a RabbitMQ node restart
```
durable=True
delivery_mode = pika.DeliveryMode.Persistent
```

## dependencies
docker
python
python module: pika

# Usage
start RabbitMQ server as container
```docker run -d -p 5672:5672 --hostname my-rabbit --name some-rabbit rabbitmq:4```

manage RabbitMQ server
```
    docker exec -it some-rabbit bash
	rabbitmqctl list_queues
```
