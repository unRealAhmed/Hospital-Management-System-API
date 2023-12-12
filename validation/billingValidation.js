const Joi = require('joi');

const billingValidationSchema = Joi.object({
  totalAmount: Joi.number().precision(2).positive().required().messages({
    'number.precision': 'Total amount must have at most 2 decimal places',
    'number.positive': 'Total amount must be a positive number',
    'any.required': 'Total amount is required',
  }),
  paymentStatus: Joi.string().max(255).required().messages({
    'string.max': 'Payment status cannot exceed {#limit} characters',
    'any.required': 'Payment status is required',
  }),
  patientId: Joi.number().integer().positive().required().messages({
    'number.integer': 'Patient ID must be an integer',
    'number.positive': 'Patient ID must be a positive number',
    'any.required': 'Patient ID is required',
  }),
}).options({ stripUnknown: true });

module.exports = billingValidationSchema;
