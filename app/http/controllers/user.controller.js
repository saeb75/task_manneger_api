class UserController {
  getProfile(req, res) {}
  editProfile(req, res) {}
  addSkill(req, res) {}
  editSkill(req, res) {}
  acceptInvite(req, res) {}
  rejectInvite(req, res) {}
}

module.exports = {
  UserController: new UserController(),
};
