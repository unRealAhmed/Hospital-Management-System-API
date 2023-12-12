const Appointment = require('../models/Appointment');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const User = require('../models/User');


exports.createAppointment = asyncHandler(async (req, res, next) => {
  const { date, time, status, patientId, doctorId } = req.body;

  const appointment = await Appointment.create({
    date,
    time,
    status,
    patientId,
    doctorId,
  });

  res.status(201).json({
    success: true,
    data: appointment,
  });
});

exports.getAppointment = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;

  const appointment = await Appointment.findByPk(appointmentId, {
    include: [
      {
        model: Doctor,
        as: 'assignedDoctor',
        attributes: ['doctorId', 'specialization'],
        include: {
          model: User,
          attributes: ['name'],
        },
      },
      {
        model: Patient,
        as: 'assignedPatient',
        attributes: ['patientId', 'age', 'gender'],
        include: {
          model: User,
          attributes: ['name'],
        },
      },
    ],
  });

  if (!appointment) {
    return next(new AppError('Appointment not found.', 404));
  }

  res.status(200).json({
    success: true,
    data: appointment,
  });
});


exports.cancelAppointment = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;

  const appointment = await Appointment.findByPk(appointmentId);

  if (!appointment) {
    return next(new AppError('Appointment not found.', 404));
  }

  await appointment.update({ status: 'cancelled' });

  res.status(200).json({
    success: true,
    message: 'Appointment cancelled successfully.',
  });
});


exports.rescheduleAppointment = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;
  const { newDate, newTime } = req.body;

  const appointment = await Appointment.findByPk(appointmentId);

  if (!appointment) {
    return next(new AppError('Appointment not found.', 404));
  }

  await appointment.update({
    date: newDate,
    time: newTime,
  });

  res.status(200).json({
    success: true,
    message: 'Appointment rescheduled successfully.',
    data: {
      appointmentId,
      date: newDate,
      time: newTime,
    },
  });
});



