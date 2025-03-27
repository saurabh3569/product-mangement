const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  USER_NOT_FOUND,
  NO_TOKEN,
  INVALID_TOKEN,
} = require("../constant/errorConstant");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: NO_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new CustomError(404, USER_NOT_FOUND);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new CustomError(404, INVALID_TOKEN);
  }
};

module.exports = auth;
