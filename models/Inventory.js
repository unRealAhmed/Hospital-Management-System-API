const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const Inventory = sequelize.define('Inventory', {
  itemId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
  },
  supplierInformation: {
    type: DataTypes.TEXT,
  },
});


module.exports = Inventory;
