const express = require('express');
const patientValidation = require('../validation/patientValidation');
const validationFunction = require('../middleware/validationFunction');

const {
  createPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');
const { protect, restrictTo } = require('../controllers/userController');

const router = express.Router();

router.post(
  '/create/:userId',
  validationFunction(patientValidation),
  createPatient
);

router.use(protect);

router.get('/', restrictTo('doctor'), getAllPatients);

router
  .route('/:patientId')
  .get(getPatient)
  .patch(updatePatient)
  .delete(deletePatient);

module.exports = router;
