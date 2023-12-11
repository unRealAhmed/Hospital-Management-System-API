const Patient = require('../models/Patient');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');
const createToken = require('../util/createToken');


// Helper function to send JWT token as a response
const sendTokenResponse = (res, user, statusCode) => {
  // Create a JWT token 
  const token = createToken(res, user.id);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

// Create Patient
exports.createPatient = asyncHandler(async (req, res, next) => {
  const { age, gender, medicalHistory } = req.body;
  const { userId } = req.params;

  const patient = await Patient.create({
    age,
    gender,
    medicalHistory,
    userId,
  });

  sendTokenResponse(res, patient, 201);
});

exports.getAllPatients = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = 10;

  const skip = (page - 1) * limit;

  const patients = await Patient.findAll({
    limit,
    skip,
  });

  const totalPatients = await Patient.count();

  res.status(200).json({
    success: true,
    data: patients,
    pageInfo: {
      currentPage: page,
      limit,
      totalPages: Math.ceil(totalPatients / limit),
    },
  });
});


exports.getPatient = asyncHandler(async (req, res, next) => {
  const { patientId } = req.params;

  const patient = await Patient.findByPk(patientId);

  if (!patient) {
    return next(new AppError('Patient not found.', 404));
  }

  res.status(200).json({
    success: true,
    data: patient,
  });
});

exports.updatePatient = asyncHandler(async (req, res, next) => {
  const { patientId } = req.params;
  const updateData = req.body;

  const patient = await Patient.findByPk(patientId);

  if (!patient) {
    return next(new AppError('Patient not found.', 404));
  }

  await patient.update(updateData);

  const updatedPatient = await Patient.findByPk(patientId);

  res.status(200).json({
    success: true,
    data: updatedPatient,
  });
});

exports.deletePatient = asyncHandler(async (req, res, next) => {
  const { patientId } = req.params;

  const patient = await Patient.findByPk(patientId);

  if (!patient) {
    return next(new AppError('Patient not found.', 404));
  }

  await patient.destroy();

  res.status(200).json({
    success: true,
    message: 'Patient deleted successfully.',
  });
});
