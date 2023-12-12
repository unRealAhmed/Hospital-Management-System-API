const express = require('express');
const AvailabilityScheduleValidation = require('../validation/AvailabilityScheduleValidation');

const {
  createAvailabilitySchedule,
  updateAvailabilitySchedule,
  deleteAvailabilitySchedule,
  getAvailabilityScheduleForDoctor
} = require('../controllers/availabilityScheduleCtr');
const { protect, restrictTo } = require('../controllers/userController');
const validationFunction = require('../middleware/validationFunction');

const router = express.Router();

router.use(protect);

router.get('/doctors/:doctorId', getAvailabilityScheduleForDoctor);

// Restricted to 'doctor' routes
router.use(restrictTo('doctor'));

router.post('/', validationFunction(AvailabilityScheduleValidation), createAvailabilitySchedule);

router
  .route('/:availabilityId')
  .put(updateAvailabilitySchedule)
  .delete(deleteAvailabilitySchedule);

module.exports = router;
