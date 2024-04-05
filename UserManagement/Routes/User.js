const express = require("express");
const multer = require("multer"); // Import multer for handling form data
const path = require('path');
const { spawn } = require('child_process');
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
  router.post('/music', async (req, res) => {
    try {
        const pythonScriptPath = path.join(__dirname, '..', './Routes/Music.py'); // Path to your Python script
        const { youtube_url } = req.body; // Get YouTube URL from request body
        const args = [youtube_url]; // Pass YouTube URL as an argument to the Python script

        const process = spawn('python', [pythonScriptPath, ...args]);

        let output = '';

        process.stdout.on('data', (data) => {
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            console.error(`Error: ${data.toString()}`);
        });

        process.on('close', (code) => {
            if (code === 0) {
                res.status(200).json({ success: true, message: 'Song downloaded successfully', output });
            } else {
                res.status(500).json({ success: false, message: 'Error  ' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/music', async (req, res) => {
  try {
      const pythonScriptPath = path.join(__dirname, '..', './Routes/Music.py'); // Path to your Python script
      const { youtube_url } = req.body; // Get YouTube URL from request body
      const args = [youtube_url]; // Pass YouTube URL as an argument to the Python script

      const process = spawn('python', [pythonScriptPath, ...args]);

      let output = '';

      process.stdout.on('data', (data) => {
          output += data.toString();
      });

      process.stderr.on('data', (data) => {
          console.error(`Error: ${data.toString()}`);
      });

      process.on('close', (code) => {
          if (code === 0) {
              res.status(200).json({ success: true, message: 'Song downloaded successfully', output });
          } else {
              res.status(500).json({ success: false, message: 'Error  ' });
          }
      });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



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
