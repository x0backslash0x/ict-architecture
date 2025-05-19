Repository voor labo oefeningen bij OLOD ICT Architecture

# Labo 9
## setup
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

# Labo 10
https://kubernetes.io/docs/concepts/services-networking/ingress/
https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
[helm docs](https://helm.sh/docs/intro/install/)

## Setup
**helm lokaal installeren**
* [windows binary](https://get.helm.sh/helm-v3.18.0-rc.2-windows-amd64.zip) downloaden
* uitpakken in ProgramFiles
* verwijzing in system path zetten (System Properties > Advanced > Environment Variables > System variables > Path)

**ingress controller installeren**
```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \
  --create-namespace \
  --namespace ingress-nginx
```

**docker image voorzien**
```
docker build -t x0backslash0x/gateway .
docker push x0backslash0x/gateway
```

**host verwijzing toevoegen**
c:\windows\system32\drivers\etc\hosts
127.0.0.1 mp3convertor.com
