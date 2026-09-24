const { Kafka } = require("kafkajs");

const kafka = new Kafka({

    clientId: "engineering-data-playground",

    brokers: ["localhost:9092"]

});

module.exports = kafka;