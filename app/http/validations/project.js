const { body } = require("express-validator");

const createProjectValidator = (req, res, next) => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("text").notEmpty().withMessage("text is required"),
  ];
};

module.exports = {
  createProjectValidator,
};
