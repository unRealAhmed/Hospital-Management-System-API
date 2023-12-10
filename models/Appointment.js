const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

const Appointment = sequelize.define('Appointment', {
  appointmentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Foreign keys
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Patients',
      key: 'patientId',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Doctors',
      key: 'doctorId',
    },
  },
});

Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = Appointment;
