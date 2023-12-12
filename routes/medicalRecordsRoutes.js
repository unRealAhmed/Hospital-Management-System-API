const express = require('express');
const MedicalRecordValidation = require('../validation/MedicalRecordValidation');

const {
  createMedicalRecord,
  getMedicalRecordsForPatient,
  getMedicalRecordsForDoctor,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require('../controllers/medicalRecordsController');
const { protect, restrictTo } = require('../controllers/userController');
const validationFunction = require('../middleware/validationFunction');

const router = express.Router();

router.use(protect);

// Patient routes
router.get('/patient/:patientId', getMedicalRecordsForPatient);

// Doctor routes
router.use(restrictTo('doctor'));

router.post('/', validationFunction(MedicalRecordValidation), createMedicalRecord);

router.get('/doctor/:doctorId', getMedicalRecordsForDoctor);
router.put('/:recordId', updateMedicalRecord);
router.delete('/:recordId', deleteMedicalRecord);

module.exports = router;
