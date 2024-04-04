const express = require("express");
const { allMessages, sendMessage } = require("../controllers/messageControllers");
const { protect } = require("../../UserManagement/Middleware/AuthMiddleware");
const router = express.Router();
const multer = require("multer"); 

 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/');
  },
   filename: function (req, file, cb) {
     cb(null, file.originalname);
  }
 });

 const upload = multer({ storage: storage }); // Initialize multer here

router.route("/:chatId").get(protect, allMessages);
//router.route("/").post(protect, sendMessage);
router.route("/").post(protect, upload.single('file'), sendMessage);

module.exports = router;
