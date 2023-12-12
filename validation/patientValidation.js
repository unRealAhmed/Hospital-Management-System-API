const Joi = require('joi');

const patientValidationSchema = Joi.object({
  age: Joi.number().integer().min(1).required().messages({
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be at least {#limit} years',
    'any.required': 'Age is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.valid': 'Invalid gender',
    'any.required': 'Gender is required',
  }),
  medicalHistory: Joi.string().allow('').max(5000).messages({
    'string.max': 'Medical history cannot exceed {#limit} characters',
  }),
  appointmentId: Joi.number().integer().positive().allow(null),
  medicalRecordId: Joi.number().integer().positive().allow(null),
  userId: Joi.number().integer().positive().required().messages({
    'number.integer': 'User ID must be an integer',
    'number.positive': 'User ID must be a positive number',
    'any.required': 'User ID is required',
  }),
}).options({ stripUnknown: true });

module.exports = patientValidationSchema;
