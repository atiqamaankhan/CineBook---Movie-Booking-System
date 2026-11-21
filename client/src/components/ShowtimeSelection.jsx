
import { useState } from "react";
import "./ShowtimeSelection.css";

function ShowtimeSelection({ movie, onBack, onSelectShow }) {

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  // Sample dates
  const dates = [
    "17 Nov",
    "18 Nov",
    "19 Nov",
    "20 Nov",
    "21 Nov"
  ];

  // Sample theatre and showtime data
  const theatres = [
    {
      id: 1,
      name: "INOX Cinemas",
      location: "City Centre, Kolkata",
      shows: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
    },
    {
      id: 2,
      name: "PVR Cinemas",
      location: "South City Mall, Kolkata",
      shows: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"]
    },
    {
      id: 3,
      name: "Cinepolis",
      location: "Acropolis Mall, Kolkata",
      shows: ["9:30 AM", "12:30 PM", "4:00 PM", "7:30 PM"]
    }
  ];

  return (
    <div className="showtime-page">

      <button className="showtime-back" onClick={onBack}>
        ← Back to Movie
      </button>

      <div className="showtime-heading">
        <h1>Select Theatre & Showtime</h1>
        <p>Booking tickets for <strong>{movie.title}</strong></p>
      </div>

      {/* Date Selection */}
      <h2>Select Date</h2>

      <div className="date-list">
        {dates.map((date, index) => (
          <button
            key={date}
            className={
              selectedDate === index
                ? "date-card active"
                : "date-card"
            }
            onClick={() => {
              setSelectedDate(index);
              setSelectedTheatre(null);
              setSelectedShow(null);
            }}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Theatre Selection */}
      <h2>Available Theatres</h2>

      <div className="theatre-list">

        {theatres.map((theatre) => (
          <div className="theatre-card" key={theatre.id}>

            <div>
              <h3>{theatre.name}</h3>
              <p>📍 {theatre.location}</p>
            </div>

            <div className="show-list">
              {theatre.shows.map((show) => (
                <button
                  key={show}
                  className={
                    selectedTheatre === theatre.id &&
                    selectedShow === show
                      ? "show-btn selected"
                      : "show-btn"
                  }
                  onClick={() => {
                    setSelectedTheatre(theatre.id);
                    setSelectedShow(show);
                  }}
                >
                  {show}
                </button>
              ))}
            </div>

          </div>
        ))}

      </div>

      {selectedShow && (
        <button
          className="continue-btn"
          onClick={() =>
            onSelectShow({
              date: dates[selectedDate],
              theatre: theatres.find(
                (t) => t.id === selectedTheatre
              ),
              show: selectedShow
            })
          }
        >
          Continue to Seat Selection →
        </button>
      )}

    </div>
  );
}

export default ShowtimeSelection;
