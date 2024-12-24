const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Import routes for user and event-related actions
const userRoutes = require("./Routes/userRoutes");
const eventRoutes = require("./Routes/eventRoutes");

// Import middleware
const verifyToken = require("./MiddleWare/verifyToken");

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err));

// Use routes
app.use("/api/users", userRoutes); // Routes for signup and login
app.use("/api/events", eventRoutes); // Routes for creating events, voting, RSVP, showing attendees

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

