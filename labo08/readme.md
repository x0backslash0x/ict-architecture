# Opgave
Voor deze reeks opdrachten doe je alles in één YAML file. Je kan best na elke tussenstap een commit maken.

## Opdracht 1
Zet een MySQL pod op zodat je er via MySQL Workbench mee kan verbinden. Je zal een `Pod`, `Service` en `Secret` moeten definiëren.</br>
```
kubectl apply -f main.yml
```

## Opdracht 2
Zorg dat je pod data persistent kan bewaren. Gebruik hiervoor een [`lokaal persistent volume`](https://kubernetes.io/docs/concepts/storage/volumes/#local). Je hoeft de storage class niet te definiëren. De opmerking uit de les rond paden in WSL blijft gelden, dus maak zelf in WSL een map ~~`/mnt/wsl/hostpath`~~ `/mnt/host/wsl/hostpath` en verwijs er in de Kubernetes file naar als `/run/desktop/mnt/host/wsl/hostpath` als je met Kubernetes op Docker Desktop werkt.

## Opdracht 3
Voeg een PHP pod toe. Gebruik hiervoor de Docker image vincentnys/apache-php-mysqli, gebaseerd op php:latest-apache (dus daar vind je de meeste instructies). Zorg dat je de indexpagina van deze pod kan bereiken vanaf localhost.

Zorg (via een `ConfigMap`) dat de indexpagina van de web server een verbinding maakt met de MySQL pod (zie deze uitleg). Laat deze iets doen zodat je zeker bent dat de verbinding werkt, zoals een `CREATE DATABASE MijnTestDB` uitvoeren. Controleer ten slotte (terug via MySQL Workbench) dat het resultaat zichtbaar is.