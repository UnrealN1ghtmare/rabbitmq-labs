const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const amqp = require('amqplib');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

const RABBITMQ_URL =
    process.env.RABBITMQ_URL ||
    'amqp://localhost';

const QUEUE_NAME =
    process.env.QUEUE_NAME ||
    'messages';

async function startConsumer() {
    try {

        const connection =
            await amqp.connect(RABBITMQ_URL);

        const channel =
            await connection.createChannel();

        await channel.assertQueue(
            QUEUE_NAME,
            { durable: true }
        );

        console.log(
            `Listening queue: ${QUEUE_NAME}`
        );

        channel.consume(
            QUEUE_NAME,
            (msg) => {

                if (!msg) return;

                const text =
                    msg.content.toString();

                console.log(
                    'Received:',
                    text
                );

                io.emit(
                    'message',
                    text
                );

                channel.ack(msg);
            }
        );

    } catch (error) {

        console.error(
            'RabbitMQ connection error:',
            error.message
        );

        setTimeout(
            startConsumer,
            5000
        );
    }
}

io.on('connection', () => {
    console.log('Browser connected');
});

server.listen(PORT, () => {

    console.log(
        `Server started on port ${PORT}`
    );

    startConsumer();
});