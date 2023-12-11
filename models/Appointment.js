const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const Appointment = sequelize.define('Appointment', {
  appointmentId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Patients',
      key: 'patientId',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Doctors',
      key: 'doctorId',
    },
  },
});

module.exports = Appointment;
