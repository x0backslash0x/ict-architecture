Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 9
# setup
* docker image builden
* docker image opladen naar docker hub
* manifest voor deployment maken
* manifest voor configmap maken
* init.sql uitvoeren (root@localhost:3306)
* deployment actief brengen
* pod uitvoeren
  - apt update & upgrade
  - curl installeren
  - login
  - token valideren

## commando's
* kubectl help
* kubectl apply -f auth.yml
* kubectl delete -f auth.yml
* kubectl get deployments
* kubectl get pods
* kubectl delete deployment authd
* kubectl logs deployment/authd
* kubectl exec -it authd-d84d979fb-8bf5f -- bash
* apt update
* apt upgrade -y
* apt install -y curl
* curl -X POST -u vincent.nys@ap.be:Admin123 localhost:5000/login
* curl -X POST -H "Authorization: Bearer <token>" localhost:5000/validate --verbose

Running on http://127.0.0.1:5000
Running on http://10.1.0.220:5000
