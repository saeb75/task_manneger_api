const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class HelperFunctions {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  comparePassword(password, hashedPassword) {
    console.log(password, hashedPassword);
    return bcrypt.compareSync(password, hashedPassword);
  }
  generateToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET_CODE, {
      expiresIn: "1h",
    });
  }
}
module.exports = {
  helper: new HelperFunctions(),
};
