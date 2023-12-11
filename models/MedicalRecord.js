const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const MedicalRecord = sequelize.define('MedicalRecord', {
  recordId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prescriptions: {
    type: DataTypes.TEXT,
  },
  testResults: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
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

module.exports = MedicalRecord;
