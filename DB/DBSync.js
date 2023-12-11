/* eslint-disable no-unused-vars */
const sequelize = require('./DBConnection')
const User = require('../models/User')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const AvailabilitySchedule = require('../models/AvailabilitySchedule')
const Appointment = require('../models/Appointment')
const Billing = require('../models/Billing')
const Inventory = require('../models/Inventory')
const MedicalRecord = require('../models/MedicalRecord')


sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});