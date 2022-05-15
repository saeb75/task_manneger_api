const multer = require("multer");
const { helper } = require("./helprs");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("first");
    cb(null, helper.createUploadPath());
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, shortid.generate() + file.originalname);
  },
});

const multerUploader = multer({ storage });

module.exports = {
  multerUploader,
};
