const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

// Register new doctor
router.post('/register', [
  check('name').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('specialization').notEmpty(),
  check('experience').isInt({ min: 0 }),
  check('qualification').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    
    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    const doctor = await Doctor.create(req.body);
    const token = jwt.sign(
      { id: doctor.id, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login doctor
router.post('/login', [
  check('email').isEmail(),
  check('password').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ where: { email } });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const isValidPassword = await doctor.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: doctor.id, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update doctor profile
router.put('/profile', [
  check('name').optional().notEmpty(),
  check('email').optional().isEmail(),
  check('specialization').optional().notEmpty(),
  check('experience').optional().isInt({ min: 0 }),
  check('qualification').optional().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findByPk(decoded.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    await doctor.update(req.body);
    const updatedDoctor = await Doctor.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 