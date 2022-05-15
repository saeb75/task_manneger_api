const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/user");
const checkLogin = async (req, res, next) => {
  // try {
  //   const token = req.headers["authorization"];

  //   if (!token)
  //     return res.status(401).json({
  //       result: false,
  //       error: "Please provide a JWT token",
  //     });

  //   const authToken = token.split(" ")[1];
  //   console.log({ authToken });
  //   console.log(process.env.TOKEN_SECRET_CODE);
  //   const decoded = jwt.verify(authToken, `${process.env.TOKEN_SECRET_CODE}`);

  //   if (!decoded)
  //     return res.status(400).json({
  //       result: false,
  //       error: "JWT Verification Failed",
  //     });

  //   req.user = decoded.user;
  //   next();
  // } catch (err) {
  //   return res.json({
  //     result: false,
  //     error: "JWT Verification Failed",
  //   });
  // }
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization) throw { status: 401, message: "unauthorized" };
    let token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET_CODE}`);
    if (!decoded)
      return res.status(400).json({
        result: false,
        error: "JWT Verification Failed",
      });

    const user = await UserModel.findOne({ _id: decoded.id });
    if (!user) throw { status: 401, message: "unauthorized" };
    req.user = user;
    next();
  } catch (error) {
    next({
      status: 401,
      message: "unauthorized",
    });
  }
};
module.exports = {
  checkLogin,
};
