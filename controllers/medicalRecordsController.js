const MedicalRecord = require('../models/MedicalRecord');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');


exports.createMedicalRecord = asyncHandler(async (req, res) => {
  const { diagnosis, prescriptions, testResults, date, patientId, doctorId } = req.body;

  const medicalRecord = await MedicalRecord.create({
    diagnosis,
    prescriptions,
    testResults,
    date,
    patientId,
    doctorId,
  });

  res.status(201).json({
    status: 'success',
    data: medicalRecord,
  });
});

exports.getMedicalRecordsForPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const medicalRecords = await MedicalRecord.findAll({
    where: { patientId },
  });

  res.status(200).json({
    status: 'success',
    data: medicalRecords,
  });
});

exports.getMedicalRecordsForDoctor = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;

  const medicalRecords = await MedicalRecord.findAll({
    where: { doctorId },
  });

  res.status(200).json({
    status: 'success',
    data: medicalRecords,
  });
});

exports.updateMedicalRecord = asyncHandler(async (req, res, next) => {
  const { recordId } = req.params;
  const { diagnosis, prescriptions, testResults, date } = req.body;

  let medicalRecord = await MedicalRecord.findByPk(recordId);

  if (!medicalRecord) {
    return next(new AppError('Medical record not found.', 404));
  }

  // Update the medical record details
  medicalRecord = await medicalRecord.update({
    diagnosis,
    prescriptions,
    testResults,
    date,
  });

  res.status(200).json({
    status: 'success',
    data: medicalRecord,
  });
});

exports.deleteMedicalRecord = asyncHandler(async (req, res, next) => {
  const { recordId } = req.params;

  const medicalRecord = await MedicalRecord.findByPk(recordId);

  if (!medicalRecord) {
    return next(new AppError('Medical record not found.', 404));
  }

  await medicalRecord.destroy();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});