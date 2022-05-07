const { validate } = require("express-validation");
const { body } = require("express-validator");
const { UserModel } = require("../../models/user");
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const register = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email is invalid")
      .custom(async (value, { req }) => {
        if (value) {
          const user = await UserModel.findOne({ email: value });
          if (user) {
            console.log(user);
            throw new Error("this email is already exists");
          }
          return true;
        }
        throw new Error("email is required");
      }),

    body("username").custom(async (value, { req }) => {
      if (value) {
        const user = await UserModel.findOne({ username: value });
        if (user) {
          throw new Error("username is already exists");
        }
        return true;
      }
      throw new Error("username is required");
    }),
    body("mobile").custom(async (value, { req }) => {
      if (value) {
        const user = await UserModel.findOne({ mobile: value });
        if (user) {
          throw new Error("mobile already exists");
        }
        return true;
      }
      throw new Error("mobile is required");
    }),
    body("password")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long")
      .trim(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];
};
const login = () => {
  return [
    body("email").custom(async (value, { req }) => {
      if (req.body.username) return true;
      if (value && emailRegex.test(value)) return true;
      if (value && emailRegex.test(value)) throw new Error("Email is invalid");
      throw new Error("Email or username required");
    }),
    body("username").custom(async (value, { req }) => {
      if (req.body.email) return true;
      if (value) return true;
      throw new Error("Email or username required");
    }),
    body("password").notEmpty(),
  ];
};
module.exports = {
  registerValidation: register,
  loginValidation: login,
};
