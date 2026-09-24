const kafka = require("./client");

const consumer = kafka.consumer({

    groupId: "engineering-data-group"

});

async function connectConsumer() {

    await consumer.connect();

    console.log("✅ Kafka Consumer Connected");

    await consumer.subscribe({

        topic: "upload-events",

        fromBeginning: true

    });

    await consumer.run({

        eachMessage: async ({ message }) => {

            const data = JSON.parse(

                message.value.toString()

            );

            console.log("📩 Upload Event Received");

            console.log(data);

        }

    });

}

module.exports = {

    connectConsumer

};