const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: true });

  if (error) {
    return res.status(422).json({
      success: false,
      message: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = validate;
