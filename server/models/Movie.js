
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    duration: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    releaseDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
