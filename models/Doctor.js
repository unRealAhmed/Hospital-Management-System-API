const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const Doctor = sequelize.define('Doctor', {
  doctorId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  appointmentId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Appointments',
      key: 'appointmentId',
    },
    allowNull: true,
  },
  availabilityScheduleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'AvailabilitySchedules',
      key: 'availabilityId',
    },
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Users',
      key: 'userId',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Doctor;
