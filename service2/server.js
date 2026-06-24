const express = require('express');
const amqp = require('amqplib');

const app = express();

const PORT =
    process.env.PORT || 3001;

const RABBITMQ_URL =
    process.env.RABBITMQ_URL ||
    'amqp://localhost';

const QUEUE_NAME =
    process.env.QUEUE_NAME ||
    'messages';

app.use(express.json());
app.use(express.static('public'));

app.post('/send', async (req, res) => {

    try {

        const { message } = req.body;

        const connection =
            await amqp.connect(RABBITMQ_URL);

        const channel =
            await connection.createChannel();

        await channel.assertQueue(
            QUEUE_NAME,
            { durable: true }
        );

        channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(message)
        );

        await channel.close();
        await connection.close();

        console.log(
            `Sent: ${message}`
        );

        res.send(
            `Message sent: ${message}`
        );

    } catch (error) {

        console.error(error);

        res.status(500)
           .send('Error sending message');
    }
});

app.listen(PORT, () => {

    console.log(
        `Service2 started on port ${PORT}`
    );
});