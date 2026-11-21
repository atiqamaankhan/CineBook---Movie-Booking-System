# 🎬 CineBook – Movie Ticket Booking System

A full-stack Movie Ticket Booking System developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. CineBook allows users to explore movies, select showtimes, choose seats, and book movie tickets through an interactive interface.

## 📌 Project Overview

CineBook is designed to simplify the movie ticket booking process by providing a user-friendly platform where users can browse available movies, view movie details, select theatres and showtimes, choose seats, and manage their bookings.

The application uses MongoDB Atlas for database management and JWT-based authentication to provide secure user access.

## ✨ Features

- **User Authentication:** User registration and login using JWT authentication.
- **Movie Browsing:** Explore available movies with details such as genre, rating, language, and duration.
- **Search and Filter:** Search movies and filter them by genre.
- **Movie Details:** View detailed information about selected movies.
- **Showtime Selection:** Choose theatres, dates, and available showtimes.
- **Interactive Seat Selection:** Select seats through a visual seating layout.
- **Dynamic Seat Availability:** Fetch booked seats from MongoDB and mark them as unavailable.
- **Booking Management:** Confirm bookings and generate unique booking IDs.
- **Booking History:** View previously booked tickets through the My Bookings section.
- **Duplicate Booking Prevention:** Check seat availability before confirming a booking.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB Atlas
- Mongoose

### Authentication and Security
- JSON Web Token (JWT)
- bcryptjs

### Development Tools
- Visual Studio Code
- Thunder Client
- Git and GitHub

## 📂 Project Structure

```text
CineBook/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seedMovies.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone [YOUR_GITHUB_REPOSITORY_URL](https://github.com/atiqamaankhan/CineBook---Movie-Booking-System)
```

Navigate to the project directory:

```bash
cd CineBook
```

### 2. Setup the Backend

Open a terminal and run:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and configure:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your own MongoDB connection string and a secure JWT secret.

Start the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd client
npm install
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal (usually `http://localhost:5173`).

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies/:id` | Get movie details |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get authenticated user |
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings/booked-seats` | Get booked seats for a show |
| GET | `/api/bookings/my-bookings` | Get user's booking history |

## 🗄️ Database Collections

CineBook uses MongoDB with the following main collections:

- **Users:** Stores registered user information and encrypted passwords.
- **Movies:** Stores movie details such as title, genre, rating, language, and poster.
- **Bookings:** Stores booking information including user, movie, theatre, showtime, selected seats, and total amount.

## 🧪 Testing

The backend APIs were tested using Thunder Client.

Testing included:
- User registration and login.
- JWT authentication.
- Fetching movie information.
- Creating movie ticket bookings.
- Retrieving booking history.
- Fetching booked seats.
- Checking duplicate seat booking attempts.

## 🚀 Future Enhancements

- Online payment gateway integration.
- Real-time seat availability updates.
- Admin dashboard for movie and showtime management.
- Theatre and screen management.
- Booking cancellation and refund functionality.
- Email and SMS booking confirmations.

---

⭐ If you find this project interesting, feel free to explore the repository!
