const router = require("express").Router();
const { ProjectController } = require("../http/controllers/project.controller");
const { createProjectValidator } = require("../http/validations/project");
const { checkLogin } = require("../http/middelwares/checkLogin");
const { multerUploader } = require("../modules/multer");
router.post(
  "/create",
  checkLogin,
  multerUploader.single("image"),
  createProjectValidator(),
  validationErrorMapper,
  ProjectController.createProject
);

module.exports = {
  projectRouter: router,
};
