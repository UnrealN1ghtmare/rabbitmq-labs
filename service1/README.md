# RabbitMQ Labs

Laboratory work on Docker, RabbitMQ and Kubernetes.

## Service 1

Consumer service:
- Listens to RabbitMQ queue
- Displays received messages on a web page
- Uses Socket.IO for real-time updates

## Run

docker build -t service1 ./service1

docker run -p 3000:3000 \
  -e RABBITMQ_URL=amqp://host.docker.internal \
  service1