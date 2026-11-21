
import { useEffect, useState } from "react";
import "./MyBookings.css";

function MyBookings({ onBack }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("cinebookToken");

        const response = await fetch(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch bookings."
          );
        }

        setBookings(data.bookings || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="my-bookings-page">

      <button className="bookings-back-btn" onClick={onBack}>
        ← Back to Homepage
      </button>

      <div className="bookings-heading">
        <span>YOUR CINEMA HISTORY</span>
        <h1>My Bookings</h1>
        <p>All your movie tickets in one place.</p>
      </div>

      {loading && (
        <p className="bookings-message">
          Loading your bookings...
        </p>
      )}

      {error && (
        <p className="bookings-error">{error}</p>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="empty-bookings">
          <h2>No bookings yet!</h2>
          <p>Your movie tickets will appear here.</p>
          <button onClick={onBack}>
            Explore Movies
          </button>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="booking-history">

          <div className="booking-count">
            Total Bookings: {bookings.length}
          </div>

          {bookings.map((booking) => (
            <div className="history-card" key={booking._id}>

              <div className="history-movie">

                {booking.movie?.poster && (
                  <img
                    src={booking.movie.poster}
                    alt={booking.movie.title}
                  />
                )}

                <div>
                  <h2>
                    {booking.movie?.title || "Movie unavailable"}
                  </h2>

                  <span className="history-status">
                    {booking.status}
                  </span>
                </div>

              </div>

              <div className="history-details">

                <div>
                  <span>Booking ID</span>
                  <strong>{booking.bookingId}</strong>
                </div>

                <div>
                  <span>Theatre</span>
                  <strong>{booking.theatre}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>{booking.location}</strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>{booking.showDate}</strong>
                </div>

                <div>
                  <span>Showtime</span>
                  <strong>{booking.showTime}</strong>
                </div>

                <div>
                  <span>Seats</span>
                  <strong>{booking.seats.join(", ")}</strong>
                </div>

                <div>
                  <span>Tickets</span>
                  <strong>{booking.seats.length}</strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong className="history-price">
                    ₹{booking.totalAmount}
                  </strong>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyBookings;
