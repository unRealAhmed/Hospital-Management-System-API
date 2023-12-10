const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const Appointment = require('./Appointment');
const MedicalRecord = require('./MedicalRecord');
const User = require('./User');


const Patient = sequelize.define('Patient', {
  patientId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
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
  medicalHistory: {
    type: DataTypes.TEXT,
  },
  // Foreign keys
  appointmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Appointments',
      key: 'id',
    },
  },
  medicalRecordId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'MedicalRecords',
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

Patient.belongsTo(Appointment, { foreignKey: 'appointmentId' });
Patient.belongsTo(MedicalRecord, { foreignKey: 'medicalRecordId' });
Patient.belongsTo(User, { foreignKey: 'userId' });

module.exports = Patient;
