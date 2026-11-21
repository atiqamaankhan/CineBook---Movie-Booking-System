
import "./MovieDetails.css";

function MovieDetails({ movie, onBack, onBookTickets }) {
  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className="details-page">

      <button className="back-btn" onClick={onBack}>
        ← Back to Movies
      </button>

      <div className="details-container">

        <div className="details-poster">
          <img src={movie.poster} alt={movie.title} />
        </div>

        <div className="details-info">

          <span className="details-label">
            NOW SHOWING
          </span>

          <h1>{movie.title}</h1>

          <div className="details-meta">
            <span>★ {movie.rating}</span>
            <span>{movie.genre}</span>
            <span>{movie.language}</span>
            <span>{movie.duration}</span>
          </div>

          <h3>About the Movie</h3>

          <p>
            {movie.description ||
              "Discover this movie and enjoy an unforgettable cinema experience."}
          </p>

          <button
            className="book-ticket-btn"
            onClick={onBookTickets}
          >
            Book Tickets →
          </button>

        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
