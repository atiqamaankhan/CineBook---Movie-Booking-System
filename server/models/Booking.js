
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    theatre: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    showDate: {
      type: String,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    seats: {
      type: [String],
      required: true,
      validate: {
        validator: (seats) => seats.length > 0,
        message: "At least one seat must be selected.",
      },
    },

    ticketPrice: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same seat from being booked twice
// for the same theatre, date and showtime.
bookingSchema.index(
  {
    theatre: 1,
    location: 1,
    showDate: 1,
    showTime: 1,
    seats: 1,
  },
  {
    unique: true,
    name: "unique_seat_per_show",
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
