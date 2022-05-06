const { AuthController } = require("../http/controllers/auth.controller");
const validationErrorMapper = require("../http/middelwares/validationErrorMapper");
const { registerValidation } = require("../http/validations/auth");

const router = require("express").Router();
router.post(
  "/register",
  registerValidation(),
  validationErrorMapper,
  AuthController.register
);
module.exports = {
  authRouter: router,
};
