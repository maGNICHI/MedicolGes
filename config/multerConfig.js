const multer = require("multer");
const path = require("path");
const { BadRequestError } = require("base-error-handler");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/Public/UserProfileImages");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new BadRequestError("Only images are allowed!"), false);
  }
};

const multerUploadUserProfile = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = {
  multerUploadUserProfile,
};
