const express = require("express");
const multer = require("multer"); // Import multer for handling form data

const {
  registerUser,
  authUser,logoutUser,
} = require("../Controllers/AuthController");
const {
  allUsers,
  UsersByRole,
  UsersById,getAllUsers,blockUser,unBlockUser,getUserProfile,
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


////////USERRRR
//router.route("/").get(protect, allUsers); //aamel kifha get-users
router.route("/").post(upload.fields([{ name: 'pfp', maxCount: 1 }, { name: 'certification', maxCount: 1 }]), registerUser);
router.post("/addUser", addUser); //from admin
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/get-users",  getAllUsers);
router.post("/delete-user/:id", deleteUser);
router.patch("/block-user", blockUser);
router.patch("/unblock-user",  unBlockUser);
router
  .route("/profile/:id") // Include the ID parameter in the route
  .get( getUserProfile)
  .put( updateUserProfile);
/////////////////////////////////////////////

router.get("/getCollaborative",UsersByRole);
router.get("/getUserById/:userId", UsersById);
router.route("/").post(upload.fields([{ name: 'pfp', maxCount: 1 }, { name: 'certification', maxCount: 1 }]), registerUser);
router.post("/login", authUser);
// GET user details by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return only necessary user details (e.g., username and pic)
    const { _id, username, pic } = user;
    res.json({ _id, username, pic });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});// GET user details by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return only necessary user details (e.g., username and pic)
    const { _id, username, pic } = user;
    res.json({ _id, username, pic });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});









module.exports = router;
