const express = require('express');
const { createAppointment, getAppointment, cancelAppointment, rescheduleAppointment } = require('../controllers/appointmentController');
const { protect } = require('../controllers/userController');
const validationFunction = require('../middleware/validationFunction');
const appointmentValidation = require('../validation/appointmentValidation');

const router = express.Router();

router.use(protect);

router.post('/', validationFunction(appointmentValidation), createAppointment);

router
  .route('/:appointmentId')
  .get(getAppointment)
  .delete(cancelAppointment);

router.put('/:appointmentId/reschedule', rescheduleAppointment);

module.exports = router;
