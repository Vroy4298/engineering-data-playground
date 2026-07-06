const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const recordRoutes = require("./routes/record.routes");

const app = express();

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    // Allow if FRONTEND_URL matches, or if no FRONTEND_URL is set (allow all)
    const allowed = process.env.FRONTEND_URL;
    if (!allowed || origin === allowed || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
}));


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