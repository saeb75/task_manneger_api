const { default: mongoose } = require("mongoose");
const { UserModel } = require("../../models/user");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      return res.json({ user, success: true, status: 200 });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      const data = req.body;
      const user = req.user;

      const field = ["first_name", "last_name", "skills"];
      const bad_field = [" ", undefined, null, 0, "", "0", -1];

      Object.entries(data).forEach(([key, value]) => {
        !field.includes(key) && delete data[key];
        bad_field.includes(value) && delete data[key];
      });

      if (Object.entries(data).length === 0)
        throw { status: 400, message: "no data to update" };

      const result = await UserModel.updateOne(
        { _id: user._id },
        { $set: data }
      );
      if (result) {
        return res.json({ success: true, result: "update profile is success" });
      }
    } catch (error) {
      next(error);
    }
  }
  uploadProfile(req, res) {
    console.log(req.file, req.body);
  }
  addSkill(req, res) {}
  editSkill(req, res) {}
  acceptInvite(req, res) {}
  rejectInvite(req, res) {}
}

module.exports = {
  UserController: new UserController(),
};
