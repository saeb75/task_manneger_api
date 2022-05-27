const multer = require("multer");
const { helper } = require("./helprs");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, helper.createUploadPath());
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate() + file.originalname);
  },
});

const multerUploader = multer({ storage });

module.exports = {
  multerUploader,
};
