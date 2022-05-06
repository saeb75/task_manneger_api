const { validationResult } = require("express-validator");

class AuthController {
  login() {}

  register(req, res) {
    return res.json({ result: "success" });
  }
  reset_password() {}
}
module.exports = {
  AuthController: new AuthController(),
};
