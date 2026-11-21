
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Movie = require("./models/Movie");

const movies = [
  {
    title: "Interstellar",
    description: "A journey beyond the boundaries of space and time.",
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 49m",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "Inception",
    description: "Your mind is the scene of the crime.",
    genre: "Action",
    rating: 8.8,
    duration: "2h 28m",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    title: "The Dark Knight",
    description: "Why so serious?",
    genre: "Action",
    rating: 9.0,
    duration: "2h 32m",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Dune: Part Two",
    description: "The journey continues across Arrakis.",
    genre: "Sci-Fi",
    rating: 8.5,
    duration: "2h 46m",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    title: "Avengers: Endgame",
    description: "Whatever it takes.",
    genre: "Action",
    rating: 8.4,
    duration: "3h 1m",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    title: "Joker",
    description: "Put on a happy face.",
    genre: "Drama",
    rating: 8.3,
    duration: "2h 2m",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
];

const seedMovies = async () => {
  try {
    await connectDB();

    // Remove existing sample movies
    await Movie.deleteMany({
      title: { $in: movies.map((movie) => movie.title) },
    });

    // Insert sample movies
    await Movie.insertMany(movies);

    console.log("6 sample movies added successfully!");

  } catch (error) {
    console.error("Error adding movies:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedMovies();
