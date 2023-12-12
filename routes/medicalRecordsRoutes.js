const express = require('express');
const {
  createMedicalRecord,
  getMedicalRecordsForPatient,
  getMedicalRecordsForDoctor,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require('../controllers/medicalRecordsController');
const { protect, restrictTo } = require('../controllers/userController');

const router = express.Router();

router.use(protect);

// Patient routes
router.get('/patient/:patientId', getMedicalRecordsForPatient);

// Doctor routes
router.use(restrictTo('doctor'))

router.post('/', createMedicalRecord);
router.get('/doctor/:doctorId', getMedicalRecordsForDoctor);
router.put('/:recordId', updateMedicalRecord);
router.delete('/:recordId', deleteMedicalRecord);

module.exports = router;
