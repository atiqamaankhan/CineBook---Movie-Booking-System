
const express = require("express");
const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new booking
router.post("/", protect, async (req, res) => {
  try {
    const {
      movieId,
      theatre,
      location,
      showDate,
      showTime,
      seats,
    } = req.body;

    // Validate required fields
    if (
      !movieId ||
      !theatre ||
      !location ||
      !showDate ||
      !showTime ||
      !Array.isArray(seats) ||
      seats.length === 0
    ) {
      return res.status(400).json({
        message: "Please provide all booking details.",
      });
    }

    if (!mongoose.isValidObjectId(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }

    if (
      seats.some(
        (seat) =>
          typeof seat !== "string" ||
          !/^[A-H](10|[1-9])$/.test(seat)
      ) ||
      new Set(seats).size !== seats.length
    ) {
      return res.status(400).json({
        message: "Invalid or duplicate seat selection.",
      });
    }

    // Find movie in MongoDB
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    // Calculate price on the backend
    const ticketPrice = 180;
    const totalAmount = seats.length * ticketPrice;

    // Generate booking ID
    const bookingId =
      "CB-" +
      Date.now() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    // Check whether any selected seat is already booked
    const existingBooking = await Booking.findOne({
      theatre,
      location,
      showDate,
      showTime,
      seats: { $in: seats },
      status: "Confirmed",
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "One or more selected seats are already booked. Please choose different seats.",
      });
    }

    // Save booking
    const booking = await Booking.create({
      bookingId,
      user: req.user._id,
      movie: movie._id,
      theatre,
      location,
      showDate,
      showTime,
      seats,
      ticketPrice,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      booking,
    });

  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      message: "Failed to create booking.",
    });
  }
});

// Get already booked seats for a particular show
router.get("/booked-seats", protect, async (req, res) => {
  try {
    const { theatre, location, showDate, showTime } = req.query;

    if (!theatre || !location || !showDate || !showTime) {
      return res.status(400).json({
        success: false,
        message: "Please provide theatre, location, date and showtime.",
      });
    }

    const bookings = await Booking.find({
      theatre,
      location,
      showDate,
      showTime,
      status: "Confirmed",
    }).select("seats -_id");

    const bookedSeats = bookings.flatMap((booking) => booking.seats);

    res.status(200).json({
      success: true,
      bookedSeats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booked seats.",
      error: error.message,
    });
  }
});

// Get bookings of logged-in user
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("movie", "title poster genre")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error("Fetch Bookings Error:", error);

    res.status(500).json({
      message: "Failed to fetch bookings.",
    });
  }
});

module.exports = router;
