const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Import routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const timeSlotRoutes = require('./routes/timeSlotRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/time-slots', timeSlotRoutes);
app.use('/api/doctors', doctorRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Doctor Booking API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 