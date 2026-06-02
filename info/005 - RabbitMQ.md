# inleiding
Inde theorieles

# vereiste theorie
- message queues (afweging API calls vs. message queues vs. topics)

# oefeningen
- doorloop de eerste drie [tutorials](https://www.rabbitmq.com/tutorials) ("hello world", "workers" en "pub-sub") van RabbitMQ, stel jezelf vragen bij wat elke regel doet en vraag zo nodig om verduidelijking
  - je hebt Docker Swarm Mode niet nodig (wel Docker Compose)
  - je hoeft RabbitMQ niet lokaal te installeren; je kan een container opstarten met `docker run -d -p 5672:5672 -p 15672:15672 --name some-rabbit rabbitmq:management`.
    - je vertaalt dit best naar Docker Compose
    - de tag wijst erop dat het een versie is *met* management web interface
  - gebruik Python als implementatietaal, tenzij je deze taal niet kent en een andere ondersteunde taal wel
    - ook hier hoef je niets te installeren
      - je maakt aparte services in je Compose file voor zender(s) en ontvanger(s) met daarin een `build` key, waarbij je je baseert op de `python:3` image
      - als je output verwacht en er *geen* ziet, zeker in de lus van de receiver, kan dat met buffering te maken hebben
        - `python -u` runt zonder buffering, of je kan `flush=True` toevoegen aan `print` calls
      - je moet de zender vertragen tot de broker al volledig klaar is
        - de "cleane" manier zou zijn om via een HTTP call of iets gelijkaardigs een health check te doen
        - de manier die goed genoeg is voor het labo: laat je zender een halve minuut wachten
          - dit kan in Python
          - of het kan door `bash -c "<HIER INSTRUCTIES DIE JE ZOU INTYPEN>"` als startcommando te nemen om zo meerdere opstartcommando's te simuleren

In de uitleg staat niet altijd meteen langs welke "kant" je de code moet schrijven. Stel jezelf de vraag wat de meest logische plaats is voor je naar voorbeeldcode gaat kijken.

Er staan nog enkele tutorials. Deze zijn een interessante aanvulling, maar je hoeft ze niet te doen. De tutorial "topics" omschrijft een gesofisticeerder mechanisme dan wat we tijdens de theorieles gezien hebben. Pub-sub sluit beter aan bij wat aan bod is gekomen.
