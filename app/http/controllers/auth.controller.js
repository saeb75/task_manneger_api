const { validationResult } = require("express-validator");
const { UserModel } = require("../../models/user");
const { helper } = require("../../modules/helprs");
class AuthController {
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const username = req.body.username;
      const condition = username ? { username } : { email };
      const user = await UserModel.findOne(condition);
      if (!user) throw { status: 401, message: "user or password is wrong" };
      const is_match = helper.comparePassword(password, user.password);
      if (!is_match)
        throw { status: 401, message: "user or password is wrong" };
      const token = helper.generateToken({ id: user._id });
      user.token = token;
      await user.save();
      res.json({
        success: true,
        result: {
          _id: user._id,
          email: user.email,
          username: user.username,
          mobile: user.mobile,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    const { email, password, username, mobile } = req.body;
    try {
      const hash_password = helper.hashPassword(password);

      const user = await UserModel.create({
        email,
        password: hash_password,
        username,
        mobile,
      });
      const newUser = await user.save();

      return res.json({ result: newUser, success: true });
    } catch (error) {
      next(error);
    }
  }
  reset_password() {}
}
module.exports = {
  AuthController: new AuthController(),
};
