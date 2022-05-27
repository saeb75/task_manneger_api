const { projectModel } = require("../../models/project");

class ProjectController {
  async createProject(req, res) {
    try {
      let projectObj = {};
      const { title, text } = req.body;
      projectObj = { title, text };
      if (req.file) {
        projectObj.image =
          req.file.destination.substring(7) + "/" + req.file.filename;
      }
      const user = req.user;
      projectObj.owner = user._id;

      const project = await projectModel.create(projectObj);
      if (!project) {
        return res.status(400).json({
          message: "Project not created",
        });
      }
      return res.status(200).json({
        message: "Project created",
        project,
        success: true,
      });
    } catch (error) {
      throw { status: 500, message: error.message };
    }
  }
}
module.exports = {
  ProjectController: new ProjectController(),
};
