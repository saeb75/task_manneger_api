const { validationResult } = require("express-validator");

module.exports = validationErrorMapper = (req, res, next) => {
  const errors = validationResult(req);
  const mesagges = {};
  if (!errors.isEmpty()) {
    errors.array().map((error) => {
      return (mesagges[error.param] = error.msg);
    });
    return res.status(422).json({ errors: mesagges });
  }
  next();
};
