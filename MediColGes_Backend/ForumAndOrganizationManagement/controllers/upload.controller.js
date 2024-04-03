const multer = require("multer");
const fileType = require("file-type");

const storage = multer.memoryStorage(); // Use memory storage to access file buffer

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500000, // Set the maximum file size to 500KB
  },
  fileFilter: async (req, file, cb) => {
    try {
      const type = await fileType.fromBuffer(file.buffer);
      if (
        !type ||
        !["image/jpg", "image/png", "image/jpeg"].includes(type.mime)
      ) {
        cb(new Error("Invalid file format"));
      } else {
        file.detectedMimeType = type.mime;
        cb(null, true);
      }
    } catch (err) {
      cb(err);
    }
  },
});

module.exports = { upload };
