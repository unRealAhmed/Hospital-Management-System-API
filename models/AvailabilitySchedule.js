const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const AvailabilitySchedule = sequelize.define('AvailabilitySchedule', {
  availabilityId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING(255),
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
  doctorId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Doctors',
      key: 'doctorId',
    },
    allowNull: false,
  },
});

module.exports = AvailabilitySchedule;
