const Appointment = require('../models/Appointment');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');
const AvailabilitySchedule = require('../models/AvailabilitySchedule');
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

  // 1. Find the appointment
  const appointment = await Appointment.findByPk(appointmentId, {
    include: [AvailabilitySchedule, Patient], // Include related models
  });

  if (!appointment) {
    return next(new AppError('Appointment not found.', 404));
  }

  // 2. Check availability for the new date and time
  const availableSlots = appointment.getAvailableSlots(newDate);
  if (!availableSlots.includes(newTime)) {
    return next(new AppError('The selected time is not available for this doctor on that date.', 400));
  }

  // 3. Check for conflicts with existing appointments for the doctor
  const existingAppointments = await Appointment.findAll({
    where: {
      doctorId: appointment.doctorId,
      date: newDate,
      time: newTime,
    },
  });

  if (existingAppointments.length > 0) {
    return next(new AppError('The doctor already has an appointment at that time.', 400));
  }

  // 4. Update the appointment data
  appointment.date = newDate;
  appointment.time = newTime;
  await appointment.save();

  // 5. Send confirmation message
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

