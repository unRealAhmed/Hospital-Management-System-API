const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const Appointment = require('./Appointment');
const User = require('./User');



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

Patient.hasMany(Appointment, {
  foreignKey: 'patientId',
  as: 'appointments',
});

Appointment.belongsTo(Patient, {
  foreignKey: 'patientId',
  as: 'assignedPatient',
});

Patient.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = Patient;
