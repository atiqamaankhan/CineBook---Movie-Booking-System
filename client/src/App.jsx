
import MyBookings from "./components/MyBookings";
import BookingConfirmation from "./components/BookingConfirmation";
import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import MovieDetails from "./components/MovieDetails";
import ShowtimeSelection from "./components/ShowtimeSelection";
import SeatSelection from "./components/SeatSelection";
import "./App.css";

const API_URL = "http://localhost:5000/api/movies";
const AUTH_URL = "http://localhost:5000/api/auth";

function App() {

  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [user, setUser] = useState(null);

// Check whether the user is already logged in
useEffect(() => {
  const verifyUser = async () => {
    const token = localStorage.getItem("cinebookToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${AUTH_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        localStorage.removeItem("cinebookToken");
      }
    } catch (error) {
      console.error("Session verification failed:", error);
    }
  };
    verifyUser();
  }, []);


  // Store movies retrieved from MongoDB
  const [movies, setMovies] = useState([]);

  // Search and filter states
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  // Fetch movies when the component loads
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        setMovies(data.movies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Available genres
  const genres = [
    "All",
    ...new Set(movies.map((movie) => movie.genre)),
  ];

  // Search and filter movies
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  if (showAuth) {
    return (
      <Auth
        onLogin={handleLogin}
        onClose={() => setShowAuth(false)}
      />
    );
  }

  // Booking Confirmation Page
  if (confirmedBooking && selectedMovie) {
    return (
      <BookingConfirmation
        booking={confirmedBooking}
        movie={selectedMovie}
        onHome={() => {
          setConfirmedBooking(null);
          setSelectedShow(null);
          setSelectedMovie(null);
        }}
      />
    );
  }

  // Seat Selection Page
  if (selectedShow && selectedMovie && selectedShow.theatre) {
    return (
      <SeatSelection
        movie={selectedMovie}
        showData={selectedShow}
        onBack={() => setSelectedShow(null)}
        onBookingSuccess={(booking) => {
          setConfirmedBooking(booking);
        }}
      />
    );
  }

  // Theatre and Showtime Selection Page
  if (selectedShow === true && selectedMovie) {
    return (
      <ShowtimeSelection
        movie={selectedMovie}
        onBack={() => setSelectedShow(null)}
        onSelectShow={(showData) => {
          setSelectedShow(showData);
        }}
      />
    );
  }

  // Movie Details Page
  if (selectedMovie) {
    return (
      <MovieDetails
        movie={selectedMovie}
        onBack={() => setSelectedMovie(null)}
        onBookTickets={() => setSelectedShow(true)}
      />
    );
  }

  // My Bookings Page
  if (showMyBookings) {
    return (
      <MyBookings
        onBack={() => setShowMyBookings(false)}
      />
    );
  }

  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">
        <a className="logo" href="#">
          <span>🎬</span> CineBook
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#about">About</a>
        </div>

      
  {user ? (
    <div className="user-menu">
      <span>Hi, {user.name}</span>

      <button
        className="login-btn"
        onClick={() => setShowMyBookings(true)}
      >
        My Bookings
      </button>

      <button
        className="login-btn"
        onClick={() => {
          localStorage.removeItem("cinebookToken");
          setUser(null);
          setShowMyBookings(false);
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <button
      className="login-btn"
      onClick={() => setShowAuth(true)}
    >
      Login / Register
    </button>
  )}

      </nav>

      <main>

        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-content">

            <span className="hero-label">
              YOUR CINEMA EXPERIENCE
            </span>

            <h1>
              Every Movie.
              <br />
              Every Moment.
              <br />
              <span>One Destination.</span>
            </h1>

            <p>
              Discover your favourite movies, choose your seats
              and book your next cinema experience with CineBook.
            </p>

            <a href="#movies" className="hero-btn">
              Explore Movies →
            </a>

          </div>

          <div className="hero-decoration">
            <div className="film-icon">🎥</div>
            <span>Lights. Camera. Action.</span>
          </div>
        </section>

        {/* Movies Section */}
        <section className="movies-section" id="movies">

          <div className="section-heading">
            <div>
              <span className="section-label">
                NOW SHOWING
              </span>

              <h2>Explore Movies</h2>
            </div>

            <span className="movie-count">
              {movies.length} Movies
            </span>
          </div>

          {/* Search and Genre Filters */}
          <div className="movie-controls">

            <input
              type="text"
              placeholder="Search your favourite movie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="genre-filters">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={
                    selectedGenre === genre
                      ? "genre active"
                      : "genre"
                  }
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>

          </div>

          {/* Loading Message */}
          {loading && (
            <p className="no-results">
              Loading movies from CineBook database...
            </p>
          )}

          {/* Error Message */}
          {!loading && error && (
            <p className="no-results">
              Error: {error}
            </p>
          )}

          {/* Movie Cards */}
          {!loading && !error && (
            <div className="movie-grid">

              {filteredMovies.map((movie) => (
                <div className="movie-card" key={movie._id}>

                  <div className="poster-container">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="movie-poster"
                    />

                    <span className="rating">
                      ★ {movie.rating}
                    </span>
                  </div>

                  <div className="movie-info">

                    <h3>{movie.title}</h3>

                    <p>
                      {movie.genre} · {movie.language}
                    </p>

                    <div className="movie-bottom">

                      <span>{movie.duration}</span>

                      <button
                        onClick={() => setSelectedMovie(movie)}
                      >
                        View Details
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

          {!loading && !error && filteredMovies.length === 0 && (
            <p className="no-results">
              No movies found. Try another search.
            </p>
          )}

        </section>

        {/* Footer */}
        <footer id="about">
          <h2>🎬 CineBook</h2>
          <p>Your movie. Your moment. Your booking.</p>
          <p>© 2026 CineBook. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
}

export default App;
