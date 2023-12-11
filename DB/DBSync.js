/* eslint-disable no-unused-vars */
const sequelize = require('./DBConnection');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const AvailabilitySchedule = require('../models/AvailabilitySchedule');
const Appointment = require('../models/Appointment');
const Billing = require('../models/Billing');
const Inventory = require('../models/Inventory');
const MedicalRecord = require('../models/MedicalRecord');
// Disable foreign key checks
sequelize.query('SET foreign_key_checks = 0', { raw: true })
  .then(() =>
    // Sync all models
    sequelize.sync({ force: true })
  )
  .then(() => {
    console.log('Database synchronized');
    // Re-enable foreign key checks
    return sequelize.query('SET foreign_key_checks = 1', { raw: true });
  })
  .then(() => {
    console.log('Foreign key checks re-enabled.');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });