const Joi = require("joi");

const registerUser = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(32).required(),
});

const loginUser = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(32).required(),
});

module.exports = { registerUser, loginUser };
