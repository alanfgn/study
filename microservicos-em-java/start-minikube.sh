minikube start
minikube addons enable ingress
eval $(minikube -p minikube docker-env)
minikube dashboard