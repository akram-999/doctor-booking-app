const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  patientPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled',
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

module.exports = Appointment; 