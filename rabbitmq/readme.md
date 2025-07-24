# RabbitMQ tutorials
[tutorial: Hello World](https://www.rabbitmq.com/tutorials/tutorial-one-python)

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
