const Joi = require('joi');

const appointmentValidationSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'Invalid date format',
    'any.required': 'Date is required',
  }),
  time: Joi.string().required().messages({
    'string.empty': 'Time cannot be empty',
    'any.required': 'Time is required',
  }),
  status: Joi.string().max(255).required().messages({
    'string.max': 'Status cannot exceed {#limit} characters',
    'any.required': 'Status is required',
  }),
  patientId: Joi.number().integer().positive().required().messages({
    'number.integer': 'Patient ID must be an integer',
    'number.positive': 'Patient ID must be a positive number',
    'any.required': 'Patient ID is required',
  }),
  doctorId: Joi.number().integer().positive().required().messages({
    'number.integer': 'Doctor ID must be an integer',
    'number.positive': 'Doctor ID must be a positive number',
    'any.required': 'Doctor ID is required',
  }),
}).options({ stripUnknown: true });

module.exports = appointmentValidationSchema;
