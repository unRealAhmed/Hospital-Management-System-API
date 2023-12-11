const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const Inventory = sequelize.define('Inventory', {
  itemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  itemName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
  },
  supplierInformation: {
    type: DataTypes.TEXT,
  },
});

module.exports = Inventory;
