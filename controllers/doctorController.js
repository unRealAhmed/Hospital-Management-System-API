const Doctor = require('../models/Doctor');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');
const createToken = require('../util/createToken');
// const AvailabilitySchedule = require('../models/AvailabilitySchedule');


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

exports.createDoctor = asyncHandler(async (req, res, next) => {
  const { specialization, appointmentId, availabilityScheduleId } = req.body;
  const { userId } = req.params;

  const doctor = await Doctor.create({
    specialization,
    appointmentId,
    availabilityScheduleId,
    userId,
  });

  sendTokenResponse(res, doctor, 201);
});

exports.getAllDoctors = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1; // Default to page 1
  const limit = 10; // Limit results to 10 per page

  const offset = (page - 1) * limit; // Calculate offset for pagination

  const { specialization } = req.query; // Optional filter by specialization

  const whereClause = {};
  if (specialization) {
    whereClause.specialization = specialization;
  }

  const doctors = await Doctor.findAll({
    where: whereClause,
    limit,
    offset,
  });

  const totalDoctors = await Doctor.count({ where: whereClause });

  res.status(200).json({
    success: true,
    data: doctors,
    pageInfo: {
      currentPage: page,
      limit,
      totalPages: Math.ceil(totalDoctors / limit),
    },
  });
});


exports.getDoctor = asyncHandler(async (req, res, next) => {
  const { doctorId } = req.params;

  const doctor = await Doctor.findByPk(doctorId);

  if (!doctor) {
    return next(new AppError('Doctor not found.', 404));
  }

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

exports.updateDoctor = asyncHandler(async (req, res, next) => {
  const { doctorId } = req.params;
  const updateData = req.body;

  const doctor = await Doctor.findByPk(doctorId);

  if (!doctor) {
    return next(new AppError('Doctor not found.', 404));
  }

  await doctor.update(updateData);

  const updatedDoctor = await Doctor.findByPk(doctorId);

  res.status(200).json({
    success: true,
    data: updatedDoctor,
  });
});

exports.deleteDoctor = asyncHandler(async (req, res, next) => {
  const { doctorId } = req.params;

  const doctor = await Doctor.findByPk(doctorId);

  if (!doctor) {
    return next(new AppError('Doctor not found.', 404));
  }

  await doctor.destroy();

  res.status(200).json({
    success: true,
    message: 'Doctor deleted successfully.',
  });
});

