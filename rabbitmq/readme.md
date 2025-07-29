# RabbitMQ tutorials
[tutorial 1: Hello World](https://www.rabbitmq.com/tutorials/tutorial-one-python)<br>
[tutorial 2: Work queues](https://www.rabbitmq.com/tutorials/tutorial-two-python)<br>
[tutorial 3: Publish/Subscribe](https://www.rabbitmq.com/tutorials/tutorial-three-python)

## Info
Message acknowledgement is on by default (auto_ack)<br>
Message durability: queue will survive a RabbitMQ node restart 
```
durable=True
delivery_mode = pika.DeliveryMode.Persistent
```
Fair dispatch - workers will not load an additional task while another is still being processed<br>
channel.basic_qos(prefetch_count=1)

## dependencies
docker
python
python module: pika

# Usage
start RabbitMQ server as container
```docker run -d -p 5672:5672 --hostname my-rabbit --name some-rabbit rabbitmq:4```

manage RabbitMQ server
```docker exec -it some-rabbit bash```<br>

**RabbitMQ management commands**
| list queues | rabbitmqctl list queues |
| debug messagte acknowledgements | rabbitmqctl list_queues name messages_ready messages_unacknowledged |
| list exchanges | rabbitmqctl list_exchanges |
| list bindings | rabbitmqctl list bindings |

