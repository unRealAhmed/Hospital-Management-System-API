const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const Doctor = require('./Doctor');

const AvailabilitySchedule = sequelize.define('AvailabilitySchedule', {
  availabilityId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
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
  // Foreign key
  doctorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Doctors',
      key: 'doctorId',
    },
  },
});

AvailabilitySchedule.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = AvailabilitySchedule;
