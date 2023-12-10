const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const Appointment = require('./Appointment');
const AvailabilitySchedule = require('./AvailabilitySchedule');
const User = require('./User');


const Doctor = sequelize.define('Doctor', {
  doctorId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInformation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  // Foreign keys
  appointmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Appointments',
      key: 'id',
    },
  },
  availabilityScheduleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'AvailabilitySchedules',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
});

Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Doctor.belongsTo(AvailabilitySchedule, { foreignKey: 'availabilityScheduleId' });
Doctor.belongsTo(User, { foreignKey: 'userId' });

module.exports = Doctor;
