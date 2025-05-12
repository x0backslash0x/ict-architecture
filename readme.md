Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 9
# setup
* init.sql draaien
* manifest voor deployment maken
* deployment actief brengen

## commando's
* kubectl help
* kubectl apply -f auth.yml
* kubectl get deployments
* kubectl delete deployment authd
* kubectl logs deployments/authd
* kubectl exec -it authd-d84d979fb-8bf5f -- bash
* curl -X POST -u vincent.nys@ap.be:Admin123 localhost:5000/login


Running on http://127.0.0.1:5000
Running on http://10.1.0.220:5000
