const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
class HelperFunctions {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
  generateToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET_CODE, {
      expiresIn: "24h",
    });
  }
  createUploadPath() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const uploadPath = path.join(
      __dirname,
      `../../public/upload/${year}/${month}/${day}`
    );
    fs.mkdirSync(uploadPath, { recursive: true });
    return `public/upload/${year}/${month}/${day}`;
  }
}
module.exports = {
  helper: new HelperFunctions(),
};
