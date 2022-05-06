const { authRouter } = require("./auth");
const { projectRouter } = require("./project");
const { teamRouter } = require("./team");
const { userRouter } = require("./user");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/team", teamRouter);
router.use("/user", userRouter);
router.use("/project", projectRouter);

module.exports = {
  allRoutes: router,
};
