const kafka = require("./client");

const producer = kafka.producer();

async function connectProducer() {

    await producer.connect();

    console.log("✅ Kafka Producer Connected");

}

async function sendUploadEvent(data) {

    await producer.send({

        topic: "upload-events",

        messages: [

            {

                value: JSON.stringify(data)

            }

        ]

    });

    console.log("📨 Upload Event Sent");

}

module.exports = {

    connectProducer,

    sendUploadEvent

};