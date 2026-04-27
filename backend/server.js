require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Make io available globally
global.io = io;

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hospitals", require("./routes/hospitalRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/inquiry", require("./routes/inquiryRoutes"));
app.use("/api/patient", require("./routes/patientRoutes"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
