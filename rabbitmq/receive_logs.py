import pika, sys

exchange = 'logs'

def callback(ch, method, properties, body):
    print(f" [x] {body.decode()}")

def main():
    # Set up the connection
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    # Declare the exchange
    channel.exchange_declare(exchange=exchange, exchange_type='fanout')

    # Declare a random queue
    ## once the connection is closed, the queue will be deleted
    result = channel.queue_declare(queue='', exclusive=True)
    queue_name = result.method.queue

    # Bind the queue to the exchange
    channel.queue_bind(exchange=exchange, queue=queue_name)

    # Recieve message
    channel.basic_consume(queue=queue_name,
                          on_message_callback=callback)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)

