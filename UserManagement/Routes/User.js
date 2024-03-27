const express = require("express");
const multer = require("multer"); // Import multer for handling form data

const {
  registerUser,
  authUser,logoutUser,
} = require("../Controllers/AuthController");
const {
  allUsers,getAllUsers,blockUser,unBlockUser,updateUserData,getUserProfile,
  updateUserProfile,addUser,deleteUser
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

//router.route("/").get(protect, allUsers);
router.route("/").post(upload.fields([{ name: 'pfp', maxCount: 1 }, { name: 'certification', maxCount: 1 }]), registerUser);
router.post("/addUser", addUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/get-users",  getAllUsers);
router.patch("/block-user", blockUser);
router.patch("/unblock-user",  unBlockUser);
 
router.post("/delete-user/:id", deleteUser);
router
  .route("/profile/:id") // Include the ID parameter in the route
  .get( getUserProfile)
  .put( updateUserProfile);

module.exports = router;
