const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const AvailabilitySchedule = require('./AvailabilitySchedule');
const Appointment = require('./Appointment');
const User = require('./User');

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
  availabilityScheduleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'AvailabilitySchedules',
      key: 'availabilityId',
    },
    allowNull: true
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

Doctor.hasOne(AvailabilitySchedule, {
  foreignKey: 'doctorId',
  onDelete: 'CASCADE',
});

AvailabilitySchedule.belongsTo(Doctor, {
  foreignKey: 'doctorId',
});

Doctor.hasMany(Appointment, {
  foreignKey: 'doctorId',
  as: 'appointments',
});

Appointment.belongsTo(Doctor, {
  foreignKey: 'doctorId',
  as: 'assignedDoctor',
});

Doctor.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});


module.exports = Doctor;
