const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


User.hasOne(Patient);
User.hasOne(Doctor);

module.exports = User;
