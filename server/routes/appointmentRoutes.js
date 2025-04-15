const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const TimeSlot = require('../models/TimeSlot');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      order: [['appointmentDate', 'ASC']],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new appointment
router.post('/', [
  check('patientName').notEmpty(),
  check('patientEmail').isEmail(),
  check('patientPhone').notEmpty(),
  check('appointmentDate').isISO8601(),
  check('startTime').notEmpty(),
  check('endTime').notEmpty(),
  check('reason').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { appointmentDate, startTime, endTime } = req.body;

    // Check if time slot is available
    const timeSlot = await TimeSlot.findOne({
      where: {
        startTime,
        endTime,
        isAvailable: true,
      },
    });

    if (!timeSlot) {
      return res.status(400).json({ message: 'Time slot is not available' });
    }

    const appointment = await Appointment.create(req.body);
    
    // Update time slot availability
    await timeSlot.update({
      currentAppointments: timeSlot.currentAppointments + 1,
      isAvailable: timeSlot.currentAppointments + 1 < timeSlot.maxAppointments,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.update({ status });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.destroy();
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 