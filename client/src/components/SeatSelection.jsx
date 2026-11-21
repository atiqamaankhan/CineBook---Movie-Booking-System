
import { useState, useEffect } from "react";
import "./SeatSelection.css";

function SeatSelection({
  movie,
  showData,
  onBack,
  onBookingSuccess
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const [seatLoading, setSeatLoading] = useState(true);
  const [seatLoadError, setSeatLoadError] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 10;
  const ticketPrice = 180;

  // Fetch booked seats from MongoDB
  useEffect(() => {
    const fetchBookedSeats = async () => {
      const token = localStorage.getItem("cinebookToken");

      if (!token) {
        setSeatLoadError("Please log in to view available seats.");
        setSeatLoading(false);
        return;
      }

      setSeatLoading(true);
      setSeatLoadError("");
      setSelectedSeats([]);

      try {
        const params = new URLSearchParams({
          theatre: showData.theatre.name,
          location: showData.theatre.location,
          showDate: showData.date,
          showTime: showData.show,
        });

        const response = await fetch(
          `http://localhost:5000/api/bookings/booked-seats?${params}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch booked seats."
          );
        }

        setBookedSeats(data.bookedSeats || []);

      } catch (error) {
        setSeatLoadError(error.message);
      } finally {
        setSeatLoading(false);
      }
    };

    fetchBookedSeats();
  }, [
    showData.theatre.name,
    showData.theatre.location,
    showData.date,
    showData.show
  ]);

  // Select or deselect a seat
  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId) || seatLoading) {
      return;
    }

    setSelectedSeats((previous) =>
      previous.includes(seatId)
        ? previous.filter((seat) => seat !== seatId)
        : [...previous, seatId]
    );
  };

  const totalPrice = selectedSeats.length * ticketPrice;

  // Confirm booking
  const handleContinue = async () => {
    const token = localStorage.getItem("cinebookToken");

    if (!token) {
      setBookingError("Please log in before booking.");
      return;
    }

    if (seatLoading || seatLoadError || selectedSeats.length === 0) {
      return;
    }

    setBookingLoading(true);
    setBookingError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId: movie._id,
            theatre: showData.theatre.name,
            location: showData.theatre.location,
            showDate: showData.date,
            showTime: showData.show,
            seats: selectedSeats,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Booking failed. Please try again."
        );
      }

      onBookingSuccess(data.booking);

    } catch (error) {
      setBookingError(error.message);

      // Refresh seat availability after a booking conflict
      if (error.message.includes("already booked")) {
        setSelectedSeats([]);
        window.location.reload();
      }
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="seat-page">

      <button className="seat-back-btn" onClick={onBack}>
        ← Back to Showtimes
      </button>

      <div className="seat-heading">
        <h1>Select Your Seats</h1>
        <p>{movie.title}</p>
        <p>
          {showData.theatre.name} · {showData.date} · {showData.show}
        </p>
      </div>

      <div className="screen-container">
        <div className="screen"></div>
        <p>SCREEN THIS WAY</p>
      </div>

      <div className="seat-legend">
        <span><i className="available"></i> Available</span>
        <span><i className="selected"></i> Selected</span>
        <span><i className="booked"></i> Booked</span>
      </div>

      {seatLoading && (
        <p className="seat-loading">
          Loading seat availability...
        </p>
      )}

      {seatLoadError && (
        <p style={{ color: "#ff6b6b", textAlign: "center" }}>
          {seatLoadError}
        </p>
      )}

      {!seatLoading && !seatLoadError && (
        <div className="seat-layout">

          {rows.map((row) => (
            <div className="seat-row" key={row}>

              <span className="row-label">{row}</span>

              {Array.from(
                { length: seatsPerRow },
                (_, index) => {
                  const seatId = row + (index + 1);
                  const isBooked = bookedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      disabled={isBooked}
                      className={`seat ${
                        isBooked
                          ? "booked-seat"
                          : isSelected
                            ? "selected-seat"
                            : "available-seat"
                      }`}
                      onClick={() => toggleSeat(seatId)}
                      title={seatId}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}

              <span className="row-label">{row}</span>

            </div>
          ))}

        </div>
      )}

      <div className="booking-summary">

        <h2>Booking Summary</h2>

        <p>
          Selected Seats:{" "}
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "None"}
        </p>

        <p>
          Number of Tickets: {selectedSeats.length}
        </p>

        <h3>Total: ₹{totalPrice}</h3>

        {bookingError && (
          <p style={{ color: "#ff6b6b", marginTop: "15px" }}>
            {bookingError}
          </p>
        )}

        <button
          className="confirm-seats-btn"
          disabled={
            seatLoading ||
            !!seatLoadError ||
            selectedSeats.length === 0 ||
            bookingLoading
          }
          onClick={handleContinue}
        >
          {bookingLoading
            ? "Confirming Booking..."
            : "Confirm Booking →"}
        </button>

      </div>

    </div>
  );
}

export default SeatSelection;
