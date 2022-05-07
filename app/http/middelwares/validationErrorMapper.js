const { validationResult } = require("express-validator");

module.exports = validationErrorMapper = (req, res, next) => {
  const errors = validationResult(req);
  const messages = {};
  if (!errors.isEmpty()) {
    errors.array().map((error) => {
      return (messages[error.param] = error.msg);
    });
    throw { message: messages, success: false, status: 400 };
  }
  next();
};
