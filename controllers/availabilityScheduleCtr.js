const AvailabilitySchedule = require('../models/AvailabilitySchedule');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');


exports.createAvailabilitySchedule = asyncHandler(async (req, res, next) => {
  const { day, startTime, endTime, doctorId } = req.body;

  const availabilitySchedule = await AvailabilitySchedule.create({
    day,
    startTime,
    endTime,
    doctorId,
  });

  res.status(201).json({
    success: true,
    message: 'Availability schedule created successfully.',
    data: availabilitySchedule,
  });
});

exports.updateAvailabilitySchedule = asyncHandler(async (req, res, next) => {
  const { availabilityId } = req.params;
  const { day, startTime, endTime } = req.body;

  const availabilitySchedule = await AvailabilitySchedule.findByPk(availabilityId);

  if (!availabilitySchedule) {
    return next(new AppError('Availability schedule not found.', 404));
  }

  availabilitySchedule.day = day;
  availabilitySchedule.startTime = startTime;
  availabilitySchedule.endTime = endTime;

  await availabilitySchedule.save();

  res.status(200).json({
    success: true,
    message: 'Availability schedule updated successfully.',
    data: availabilitySchedule,
  });
});

exports.deleteAvailabilitySchedule = asyncHandler(async (req, res, next) => {
  const { availabilityId } = req.params;

  const availabilitySchedule = await AvailabilitySchedule.findByPk(availabilityId);

  if (!availabilitySchedule) {
    return next(new AppError('Availability schedule not found.', 404));
  }

  await availabilitySchedule.destroy();

  res.status(204).json({
    success: true,
    message: 'Availability schedule deleted successfully.',
    data: {},
  });
});

exports.getAvailabilityScheduleForDoctor = asyncHandler(async (req, res, next) => {
  const { doctorId } = req.params;

  const availabilitySchedules = await AvailabilitySchedule.findAll({
    where: { doctorId },
  });

  res.status(200).json({
    success: true,
    data: availabilitySchedules,
  });
});
