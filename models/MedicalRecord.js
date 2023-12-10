const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

const MedicalRecord = sequelize.define('MedicalRecord', {
  recordId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  // Foreign keys
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Patients',
      key: 'patientId',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Doctors',
      key: 'doctorId',
    },
  },
});

MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = MedicalRecord;
