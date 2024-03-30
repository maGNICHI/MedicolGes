const express = require("express");
const multer = require("multer"); // Import multer for handling form data
const {
  registerUser,
  authUser,
} = require("../Controllers/AuthController");
const {
  allUsers,
  UsersByRole
} = require("../Controllers/UserController");

const { protect } = require("../Middleware/AuthMiddleware");

const router = express.Router();

// Configure multer to save uploaded files to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.route("/").get(protect, allUsers);
router.get("/getCollaborative",UsersByRole);
router.route("/").post(upload.fields([{ name: 'pfp', maxCount: 1 }, { name: 'certification', maxCount: 1 }]), registerUser);
router.post("/login", authUser);

module.exports = router;
