# Doctor Consultation Booking System

A full-stack web application for doctors to manage their consultation bookings and appointments.

## Features

- Doctor's personal website
- Online consultation booking system
- Admin dashboard for managing appointments
- Time slot management
- Booking cancellation functionality
- View upcoming bookings

## Tech Stack

- Frontend: React.js
- Backend: Express.js
- Database: PostgreSQL
- Styling: Tailwind CSS

## Project Structure

```
doctor-booking-app/
├── client/                 # React frontend
├── server/                 # Express backend
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/doctor_booking
   JWT_SECRET=your-secret-key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Database Setup

1. Create a PostgreSQL database named `doctor_booking`
2. Run the database migrations:
   ```bash
   cd server
   npm run migrate
   ```

## API Documentation

The API documentation will be available at `http://localhost:5000/api-docs` once the server is running.
