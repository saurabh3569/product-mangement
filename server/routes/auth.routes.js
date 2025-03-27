const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authController");
const validate = require("../middleware/validate");
const userValidation = require("../validations/userValidator");

router.post("/register", validate(userValidation.registerUser), register);

router.post("/login", validate(userValidation.loginUser), login);

module.exports = router;
