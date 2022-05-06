const { body } = require("express-validator");

const register = () => {
  return [
    body("email").isEmail().withMessage("Email is invalid").normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long")
      .trim(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    body("username").not().isEmpty().withMessage("username is required"),
    body("mobile").not().isEmpty().withMessage("Mobile is required"),
  ];
};
module.exports = {
  registerValidation: register,
};
