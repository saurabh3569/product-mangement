const { errorResponse } = require("../utils/responseHandler");

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!statusCode) {
    statusCode = 500;
  }

  console.error(`Error: ${message} | Status: ${statusCode}`);

  //   res.status(statusCode).json({
  //     success: false,
  //     statusCode,
  //     message: statusCode === 500 ? "Internal Server Error" : message,
  //   });
  return errorResponse(res, err, err.statusCode || 500);
};

module.exports = errorHandler;
