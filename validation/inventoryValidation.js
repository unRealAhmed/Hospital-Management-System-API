const Joi = require('joi');

const inventoryValidationSchema = Joi.object({
  itemName: Joi.string().required().messages({
    'any.required': 'Item name is required',
  }),
  quantity: Joi.number().integer().positive().required().messages({
    'number.integer': 'Quantity must be an integer',
    'number.positive': 'Quantity must be a positive number',
    'any.required': 'Quantity is required',
  }),
  expiryDate: Joi.date().allow(null, '').messages({
    'date.base': 'Expiry date must be a valid date',
  }),
  supplierInformation: Joi.string().allow(null, '').messages({
    'string.empty': 'Supplier information cannot be an empty string',
  }),
}).options({ stripUnknown: true });

module.exports = inventoryValidationSchema;
