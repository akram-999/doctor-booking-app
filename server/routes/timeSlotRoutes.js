const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const TimeSlot = require('../models/TimeSlot');

// Get all time slots
router.get('/', async (req, res) => {
  try {
    const timeSlots = await TimeSlot.findAll({
      order: [
        ['dayOfWeek', 'ASC'],
        ['startTime', 'ASC'],
      ],
    });
    res.json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new time slot
router.post('/', [
  check('dayOfWeek').isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  check('startTime').notEmpty(),
  check('endTime').notEmpty(),
  check('maxAppointments').isInt({ min: 1 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const timeSlot = await TimeSlot.create(req.body);
    res.status(201).json(timeSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update time slot
router.put('/:id', [
  check('dayOfWeek').optional().isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  check('startTime').optional().notEmpty(),
  check('endTime').optional().notEmpty(),
  check('maxAppointments').optional().isInt({ min: 1 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const timeSlot = await TimeSlot.findByPk(req.params.id);

    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    await timeSlot.update(req.body);
    res.json(timeSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete time slot
router.delete('/:id', async (req, res) => {
  try {
    const timeSlot = await TimeSlot.findByPk(req.params.id);

    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    await timeSlot.destroy();
    res.json({ message: 'Time slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 