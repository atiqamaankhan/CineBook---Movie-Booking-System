
import "./BookingConfirmation.css";

function BookingConfirmation({ booking, movie, onHome }) {
  if (!booking) {
    return <p>Booking information not found.</p>;
  }

  return (
    <div className="confirmation-page">

      <div className="confirmation-card">

        <div className="confirmation-success">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your movie tickets have been booked successfully.</p>
        </div>

        <div className="ticket-details">

          <div className="ticket-movie">
            <img
              src={movie.poster}
              alt={movie.title}
            />

            <div>
              <h2>{movie.title}</h2>
              <p>{movie.genre}</p>
            </div>
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-info">
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
              <span>Selected Seats</span>
              <strong>{booking.seats.join(", ")}</strong>
            </div>

            <div>
              <span>Tickets</span>
              <strong>{booking.seats.length}</strong>
            </div>
          </div>

          <div className="ticket-total">
            <span>Total Amount</span>
            <strong>₹{booking.totalAmount}</strong>
          </div>

        </div>

        <p className="confirmation-note">
          Thank you for choosing CineBook!
        </p>

        <button
          className="home-btn"
          onClick={onHome}
        >
          Back to Homepage
        </button>

      </div>

    </div>
  );
}

export default BookingConfirmation;
