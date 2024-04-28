# Multipod-k8-demo 
### _Three microservice communication each other using k8 deployment_
##### (used minikube for local development)

It consists of three apps-
- Auth app: Not exposed to public (via ClusterIP Service)
- Users app: Public (via LoadBalancer Service)
- Tasks app: Public (via LoadBalancer Service)


## API List
- [GET + POST] {{HOST_URL_AUTH}}/auth/ 
- [GET] {{HOST_URL_AUTH}}/auth/verify/ 
- [GET + POST] {{HOST_URL_USERS}}/users/
- [GET + POST] {{HOST_URL_TASKS}}/tasks/

## Frequently Used Commands
```sh
kubectl apply -f=auth-app/deployment.yaml,users-app/deployment.yaml,tasks-app/deployment.yaml 
```
```sh
kubectl delete -f=auth-app/deployment.yaml,users-app/deployment.yaml,tasks-app/deployment.yaml 
```

When using minikube, run after applying deployments run (as minikube does not assign external ports by default) - 
```ss
minikube service users-service tasks-service
```

eg. Deployment.yaml & service.yaml file
```sh
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tasks-app-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: tasks-app
      tier: tasks-backend
  template:
    metadata:
      labels:
        app: tasks-app
        tier: tasks-backend
    spec:
      containers:
        - name: task-node
          image: deepchandr/multipod-k8-demo:tasksv5
          env:
            # - name: auth_host_url
            #   valueFrom:
            #     configMapKeyRef:
            #       name: data-store-env
            #       key: auth_host_url
            - name: auth_host_url
              value: "auth-service.default"
---
apiVersion: v1
kind: Service
metadata:
  name: tasks-service
spec:
  selector:
    app: tasks-app
    tier: tasks-backend
  ports:
    - protocol: "TCP"
      port: 8080
      targetPort: 8080
  type: LoadBalancer

```
Here, "auth-service.default" refers to the Cluster internal IP address of the auth-service 

