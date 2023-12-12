const express = require('express');
const {
  createAvailabilitySchedule,
  updateAvailabilitySchedule,
  deleteAvailabilitySchedule,
  getAvailabilityScheduleForDoctor
} = require('../controllers/availabilityScheduleCtr');
const { protect, restrictTo } = require('../controllers/userController');

const router = express.Router();

router.use(protect)

router.get('/doctors/:doctorId', getAvailabilityScheduleForDoctor);

router.use(restrictTo('doctor'))

router.post('/', createAvailabilitySchedule);
router
  .route('/:availabilityId')
  .put(updateAvailabilitySchedule)
  .delete(deleteAvailabilitySchedule)

module.exports = router;
