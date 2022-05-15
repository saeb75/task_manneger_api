const { AuthController } = require("../http/controllers/auth.controller");
const validationErrorMapper = require("../http/middelwares/validationErrorMapper");
const {
  registerValidation,
  loginValidation,
} = require("../http/validations/auth");

const router = require("express").Router();
router.post(
  "/register",
  registerValidation(),
  validationErrorMapper,
  AuthController.register
);
router.post(
  "/login",
  loginValidation(),
  validationErrorMapper,
  AuthController.login
);

module.exports = {
  authRouter: router,
};
