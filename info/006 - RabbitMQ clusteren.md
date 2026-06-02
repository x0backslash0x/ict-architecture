# inleiding
Docker Swarm en Ceph zijn intrinsiek geclusterd, maar we kunnen ook clusters vormen op applicatieniveau eerder dan op infrastructuurniveau. Meer concreet gaat het hier om clusters van containers. We gebruiken opnieuw RabbitMQ ter illustratie, maar veel applicaties kunnen geclusterd werken en de basisideeën komen terug in meerdere applicaties.

# vereiste theorie
- message queues (afweging API calls vs. message queues vs. topics)

# oefeningen

## observeren
- zorg eerst dat je labo 5 hebt afgewerkt
- vorm bij voorkeur terug groepjes van 3 tot maximum 5 personen om de cluster te observeren en samen te debuggen
- start een cluster met 3 managers (het aantal workers is hier niet belangrijk) en log in
- zet je Compose file voor de "Hello, World!" van labo 5 over op de manager (kan met `scp`)
- pas het script aan zodat er 3 replica's van RabbitMQ zijn, 1 replica van de ontvanger en 15 replica's van de zender (dit is meer dan nodig, maar zal duidelijker maken wat gebeurt)
  - je zal je images op Docker Hub moeten zetten en publiek maken om ze in de cluster te kunnen runnen
    - geef ze best ook expliciete tags zoals `:v1`, `:v2`,... eerder dan gewoon `:latest` zodat je steeds zeker weet dat je overal de juiste image runt
- deploy de stack
- observeer via Swarm commando's wat gebeurt (toon actieve services, bekijk logs via `docker service logs --follow`,...)
- controleer **per replica** van RabbitMQ de inhoud van de queues via `docker exec -it containernaam rabbitmqctl list_queues`
  - het getal dat je ziet staan is het aantal berichten **momenteel** in de queue
- wat valt op en hoe verklaar je dit vanuit je kennis van Docker Swarm mode?

## clusteren
- zoals je ziet in [de documentatie](https://www.rabbitmq.com/docs/clustering) zijn er verschillende manieren om RabbitMQ te clusteren, wat het vreemde gedrag van eerder zal wegwerken; wij zullen eerst de simpelste methode toepassen om goed te begrijpen wat allemaal vereist is en daarna zullen we onze configuratie declaratiever maken
- controleer per replica van RabbitMQ met `hostname -i` het IP-adres op het interne netwerk
- maak op elke replica een "RabbitMQ cookie" aan met exact dezelfde inhoud onder `/var/lib/rabbitmq/.erlang.cookie`; dit is een "geheime handdruk" om deel te worden van de cluster
  - net als bij een private sleutel gelden er strenge regels rond permissies op deze file; maak hem mode 600 en eigendom van de user waaronder de RabbitMQ aan het uitvoeren is (`ps aux` en `id` zullen van pas komen)
- pas op elke RabbitMQ replica `/etc/hosts` aan met de hostnames van de andere RabbitMQ replica's aan (want de documentatie vermeldt dat ze elkaar via hostname moeten kunnen contacteren)
  - je hostname kan je zien via het `hostname` commando
- voeg de replica's samen via `rabbitmqctl join_cluster` volgens [deze instructies](https://www.rabbitmq.com/docs/clustering#clustering-and-clients)
- controleer dat de koppeling echt wel in orde is via `rabbitmqctl cluster_status`

Merk op: queues zijn nu bereikbaar via elke geclusterde node, maar gehuisvest op één node. Quorum queues zijn echt gedistribueerd en staan toe strenge garanties te bieden dat berichten niet verloren zullen gaan, ook wanneer er zich defecten voordoen.

## declaratief maken
- telkens cookies invullen, IP-adressen verzamelen, `/etc/hosts` aanpassen en `rabbitmqctl join_cluster` uitvoeren is niet werkbaar
- maak eerst een file met daarin de inhoud van de RabbitMQ cookie en zorg dat hij gedeeld is over de replica's, opnieuw in mode 600 en als eigendom van de juiste user (zoek de Compose referentie rond secrets)
- maak de hostnames van je replica's voorspelbaar
  - hiervoor gebruik je templating functionaliteit van stack files
    - voeg `hostname: "{{.Task.Slot}}.rabbitmq"` toe aan je RabbitMQ service 
      - merk op dat je `nslookup tasks.rabbitmq` kan uitvoeren om de replica's te achterhalen
    - redeploy de stack
    - log in op de replica's in kwestie
      - wat valt op?
    - je wil dat deze volledige namen gebruikt worden als voor communicataie en niet alleen het korte deel, dus zorg dat de omgevingsviarabele `RABBITMQ_USE_LONGNAME` op `true` staat
    - binnen de cluster krijgen nodes ook een naam, stel deze in via `RABBITMQ_NODENAME`; zorg dat hij dezelfde is als de hostnaam, maar voorafgegaan door `rabbit@`
- ten slotte moeten we "peer discovery" voorzien zodat de nodes elkaar weten te vinden
  - baseer je op [dit deel van de documentataie](https://www.rabbitmq.com/docs/cluster-formation#peer-discovery-classic-config)
    - we gebruiken ook `classic_config`; dit is een klein beetje lastiger te automatiseren, maar het vermijdt issues gerelateerd aan de timing waarmee de containers starten
