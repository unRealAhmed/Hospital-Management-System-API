const Joi = require('joi');

const medicalRecordValidationSchema = Joi.object({
  diagnosis: Joi.string().required().messages({
    'any.required': 'Diagnosis is required',
  }),
  prescriptions: Joi.string().allow(null, '').messages({
    'string.empty': 'Prescriptions cannot be an empty string',
  }),
  testResults: Joi.string().allow(null, '').messages({
    'string.empty': 'Test results cannot be an empty string',
  }),
  date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date',
    'any.required': 'Date is required',
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

module.exports = medicalRecordValidationSchema;
