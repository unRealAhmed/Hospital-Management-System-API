const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const Patient = sequelize.define('Patient', {
  patientId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  medicalHistory: {
    type: DataTypes.TEXT,
  },
  appointmentId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Appointments',
      key: 'appointmentId',
    },
  },
  medicalRecordId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'MedicalRecords',
      key: 'recordId',
    },
    allowNull: true,
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

module.exports = Patient;
