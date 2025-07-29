#!/usr/bin/env python
import pika, sys

message = ' '.join(sys.argv[1:]) or "Hello world!"
exchange='logs'

# Set up the connection
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

# Declare the exchange
channel.exchange_declare(exchange=exchange, exchange_type='fanout')

# Publish to the exchange
## The messages will be lost if no queue is bound to the exchange yet.
## But that's ok; if no consumer is listening yet we can safely discard the message
channel.basic_publish(exchange=exchange,
                      routing_key='',
                      body=message)

# Feedback
print(f" [x] Sent {message}")

# Close the connection
connection.close()

