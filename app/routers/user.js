const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middelwares/checkLogin");
const { multerUploader } = require("../modules/multer");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = require("express").Router();
router.get("/get-user", checkLogin, UserController.getProfile);
router.post("/update", checkLogin, UserController.editProfile);
router.post(
  "/upload-profile",
  multerUploader.single("avatar"),
  checkLogin,

  UserController.uploadProfile
);
module.exports = {
  userRouter: router,
};
