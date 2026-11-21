
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to CineBook Backend!");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CineBook Backend is running successfully!",
  });
});

// Movie APIs
app.use("/api/movies", movieRoutes);

// Authentication APIs
app.use("/api/auth", authRoutes);

// Register the booking routes
app.use("/api/bookings", bookingRoutes);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`CineBook Server running on port ${PORT}`);
  });
};

startServer();
