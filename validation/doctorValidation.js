const Joi = require('joi');

const doctorValidationSchema = Joi.object({
  specialization: Joi.string().max(255).required().messages({
    'string.max': 'Specialization cannot exceed {#limit} characters',
    'any.required': 'Specialization is required',
  }),
  availabilityScheduleId: Joi.number().integer().positive().allow(null),
  userId: Joi.number().integer().positive().required().messages({
    'number.integer': 'User ID must be an integer',
    'number.positive': 'User ID must be a positive number',
    'any.required': 'User ID is required',
  }),
}).options({ stripUnknown: true });

module.exports = doctorValidationSchema;
