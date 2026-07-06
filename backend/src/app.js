const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const recordRoutes = require("./routes/record.routes");

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/records", recordRoutes);

app.get("/", (req, res) => {
    res.json({
        status: "running"
    });
});

module.exports = app;