const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sequelize = require('../DB/DBConnection');
// const Patient = require('./Patient');


const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('patient', 'doctor'),
    allowNull: false
  },
  passwordChangedAt: DataTypes.DATE,
  passwordResetToken: DataTypes.STRING,
  passwordResetExpires: DataTypes.DATE,
}, {
  timestamps: true,
});

// Method to compare passwords
User.prototype.passwordMatching = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

// Method to check if the password has changed after the token was issued
User.prototype.changedPasswordAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    // Convert passwordChangedAt timestamp to seconds
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return tokenIssuedAt < changedTimestamp;
  }
  return false;
};

// Helper function to hash the password
const hashPassword = async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
};

// Hash password before creating or updating user
User.beforeCreate(async (user, options) => {
  await hashPassword(user, options);
});

User.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    await hashPassword(user, options);
  }
});

// Method to create a password reset token
User.prototype.createPasswordResetToken = function () {
  // Generate a random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash the token and set it on the user
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// User.hasOne(Doctor, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE',
// });

// User.hasOne(Patient, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE',
// });

module.exports = User;
