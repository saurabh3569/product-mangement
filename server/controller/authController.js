const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  INVALID_CREDENTIAL,
  USER_EMAIL_CONFLICT,
} = require("../constant/errorConstant");
const CustomError = require("../utils/customError");
const { successResponse } = require("../utils/responseHandler");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError(401, INVALID_CREDENTIAL);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError(401, INVALID_CREDENTIAL);
    }

    const token = generateToken(user._id);
    return successResponse(res, { token, user }, "User logged in successfully");
  } catch (error) {
    console.error("Login Error:", error.message);
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.exists({ email });

    if (existingUser) {
      throw new CustomError(409, USER_EMAIL_CONFLICT);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword, name });

    const token = generateToken(user._id);

    return successResponse(res, { token, user }, "User created successfully");
  } catch (error) {
    console.error("Registration Error:", error.message);
    next(error);
  }
};

module.exports = {
  login,
  register,
};
