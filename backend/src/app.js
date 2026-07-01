const express = require("express");
const uploadRoutes = require("./routes/upload.routes");

const app = express();

app.use(express.json());
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
    res.json({
        status: "running"
    });
});

module.exports = app;