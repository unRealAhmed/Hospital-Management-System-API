const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const Billing = sequelize.define('Billing', {
  billId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Patients',
      key: 'patientId',
    },
  },
});

module.exports = Billing;
