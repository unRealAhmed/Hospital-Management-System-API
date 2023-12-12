const Joi = require('joi');

const userValidationSchema = Joi.object({
  userId: Joi.number().integer().message('Invalid User ID'),
  email: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.max': 'Email cannot exceed {#limit} characters',
      'any.required': 'Email is required',
    }),
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': 'Name must be at least {#limit} characters long',
      'string.max': 'Name cannot exceed {#limit} characters',
      'any.required': 'Name is required',
    }),
  password: Joi.string()
    .min(6)
    .max(255)
    .required()
    .messages({
      'string.min': 'Password must be at least {#limit} characters long',
      'string.max': 'Password cannot exceed {#limit} characters',
      'any.required': 'Password is required',
    }),
  role: Joi.string().valid('patient', 'doctor').required(),
  passwordChangedAt: Joi.date(),
  passwordResetToken: Joi.string(),
  passwordResetExpires: Joi.date(),
}).options({ stripUnknown: true });

module.exports = userValidationSchema;
