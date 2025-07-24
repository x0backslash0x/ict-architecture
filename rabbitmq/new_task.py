#!/usr/bin/env python
import pika, sys

message = ' '.join(sys.argv[1:]) or "Hello world!"
queue = 'task_queue'

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue=queue, durable=True)
channel.basic_publish(exchange='',
                      routing_key=queue,
                      body=message,
                      properties=pika.BasicProperties(
                        delivery_mode = pika.DeliveryMode.Persistent))
print(f" [x] Sent {message}")
connection.close()

