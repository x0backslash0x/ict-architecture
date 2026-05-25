Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 3 (bis jaar)
## Gebruik
**certificaat aanmaken**
```bash
mkdir -p certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/local.key -out certs/local.crt \
  -subj "/CN=*.swarm.localhost"
```

**hashed wachtwoord berekenen**
```bash
sudo apt install apache2-utils
htpasswd -nb admin "P@ssw0rd" | sed -e 's/\$/\$\$/g'
```

**docker omgeving klaar maken**
```bash
docker swarm init
docker stack deploy -c docker-compose-swarm.yaml traefik
```

**service testen**

`curl -k https://whoami.swarm.localhost/`
