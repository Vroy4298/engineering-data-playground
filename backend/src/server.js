require("dotenv").config();

const app = require("./app");
const { connectProducer } = require("./kafka/producer");
const { connectConsumer } = require("./kafka/consumer");

const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────────────────────────────────────
// Kafka: connect in the background — non-blocking.
//
// WHY: Kafka is an optional layer on top of the core ingestion pipeline.
// If Kafka is not running (e.g., local dev without Docker Kafka), the Express
// server should still start and serve HTTP requests normally.
// When Kafka comes up later, it will automatically reconnect (KafkaJS retries).
// ─────────────────────────────────────────────────────────────────────────────
async function connectKafka() {
    try {
        await connectProducer();
        await connectConsumer();
        console.log("✅ Kafka connected");
    } catch (error) {
        console.warn("⚠️  Kafka not available — server will run without Kafka.");
        console.warn("    Start Kafka via: docker compose -f docker/docker-compose.yml up kafka -d");
        console.warn("    Events will not be published until Kafka is available.");
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Start the HTTP server first — then attempt Kafka in the background.
// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    connectKafka(); // fire-and-forget
});