# RabbitMQ Labs

Laboratory works on Docker, RabbitMQ and Kubernetes.

## Laboratory Work #1

### RabbitMQ Basics

Implemented a simple distributed system using RabbitMQ:

- Producer service sends messages to RabbitMQ queue
- Consumer service receives messages from queue
- Message exchange using AMQP protocol
- Queue management and testing

---

## Laboratory Work #2

### Docker Compose Deployment

The system was containerized using Docker and Docker Compose.

Components:

- RabbitMQ broker
- Service1 (Consumer)
- Service2 (Producer)

Features:

- Automatic container startup
- Internal Docker networking
- Environment variable configuration
- RabbitMQ Management UI

Run:

```bash
docker-compose up --build
```

---

## Laboratory Work #3

### Kubernetes Deployment with Minikube

The Docker Compose application was migrated to Kubernetes.

Implemented Kubernetes resources:

- Deployments
- Services
- ConfigMaps

Architecture:

- RabbitMQ Deployment
- Service1 Deployment
- Service2 Deployment
- RabbitMQ Service
- Service1 Service
- Service2 Service

Features:

- Automatic pod management
- Service discovery
- Environment configuration through ConfigMap
- Horizontal scaling support

Run:

```bash
kubectl apply -f k8s/
```

Check resources:

```bash
kubectl get pods
kubectl get services
```

Port forwarding:

```bash
kubectl port-forward service/service1 3000:3000
kubectl port-forward service/service2 3001:3001
```

---

## Service1

Consumer service:

- Connects to RabbitMQ
- Receives messages from queue
- Displays messages in browser
- Uses Socket.IO for real-time updates

Default port:

```text
3000
```

---

## Service2

Producer service:

- Sends messages to RabbitMQ
- Provides web interface for message publishing
- Publishes messages to queue

Default port:

```text
3001
```

---

## Technologies

- Node.js
- Express
- RabbitMQ
- Socket.IO
- Docker
- Docker Compose
- Kubernetes
- Minikube

---