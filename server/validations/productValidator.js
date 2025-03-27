const Joi = require("joi");

const createProduct = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().integer().min(1).required(),
  description: Joi.string().max(500).optional().allow(""),
  stock: Joi.number().integer().min(0).default(0),
});

const updateProduct = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  price: Joi.number().integer().min(1).optional(),
  description: Joi.string().max(500).optional().allow(""),
  stock: Joi.number().integer().min(0).optional().default(0),
});

module.exports = { createProduct, updateProduct };
