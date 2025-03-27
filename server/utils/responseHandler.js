const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

const errorResponse = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: error.message || "Internal Server Error",
  });
};

module.exports = { successResponse, errorResponse };
