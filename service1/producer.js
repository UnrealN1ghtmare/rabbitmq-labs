const amqp = require('amqplib');

async function sendMessage() {
    try {
        const connection = await amqp.connect('amqp://localhost');

        const channel = await connection.createChannel();

        const queue = 'messages';

        await channel.assertQueue(queue, {
            durable: true
        });

        const message =
            process.argv[2] || 'Hello RabbitMQ';

        channel.sendToQueue(
            queue,
            Buffer.from(message)
        );

        console.log(
            `Sent: ${message}`
        );

        setTimeout(() => {
            connection.close();
        }, 500);

    } catch (err) {
        console.error(err);
    }
}

sendMessage();