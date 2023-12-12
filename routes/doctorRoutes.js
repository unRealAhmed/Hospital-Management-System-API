const express = require('express');
const doctorValidation = require('../validation/doctorValidation');

const {
  createDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { protect, restrictTo } = require('../controllers/userController');
const validationFunction = require('../middleware/validationFunction');

const router = express.Router();

router.post('/create/:userId', validationFunction(doctorValidation), createDoctor);

// Public routes
router.get('/', getAllDoctors);
router.get('/:doctorId', getDoctor);

// Restricted to 'doctor' routes
router.use(protect, restrictTo('doctor'));

router.route('/:doctorId')
  .patch(updateDoctor)
  .delete(deleteDoctor);

module.exports = router;
