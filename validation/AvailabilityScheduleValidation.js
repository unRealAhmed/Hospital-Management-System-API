const Joi = require('joi');

const availabilityScheduleValidationSchema = Joi.object({
  day: Joi.string().max(255).required().messages({
    'string.max': 'Day cannot exceed {#limit} characters',
    'any.required': 'Day is required',
  }),
  startTime: Joi.string().required().messages({
    'string.empty': 'Start time cannot be empty',
    'any.required': 'Start time is required',
  }),
  endTime: Joi.string().required().messages({
    'string.empty': 'End time cannot be empty',
    'any.required': 'End time is required',
  }),
  doctorId: Joi.number().integer().positive().required().messages({
    'number.integer': 'Doctor ID must be an integer',
    'number.positive': 'Doctor ID must be a positive number',
    'any.required': 'Doctor ID is required',
  }),
}).options({ stripUnknown: true });

module.exports = availabilityScheduleValidationSchema;
