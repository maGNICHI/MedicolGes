const express = require("express");
const multer = require("multer"); // Import multer for handling form data
const path = require('path');


const uploadd = multer({ dest: 'uploads/' });
const { spawn } = require('child_process');
const {
  registerUser,
  authUser,logoutUser,
} = require("../Controllers/AuthController");
const nodemailer = require('nodemailer');
const User = require('../Model/User');
   // For generating the reset token
 
const jwt = require('jsonwebtoken')
const {
  allUsers,
  UsersByRole,
  UsersById,getAllUsers,blockUser,unBlockUser,getUserProfile,getAllPic,
  updateUserProfile,addUser,deleteUser ,updateUserRoleToAdmin
} = require("../Controllers/UserController");
const { protect } = require("../Middleware/AuthMiddleware");
const crypto = require('crypto');
const router = express.Router();
const fs = require('fs');

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

//router.route("/").get(protect, allUsers); //aamel kifha get-users
 
router.get("/getCollaborative",UsersByRole);
router.get("/getUserById/:userId", UsersById);
router.route("/").post(upload.fields([{ name: 'pfp', maxCount: 1 }, { name: 'certification', maxCount: 1 }]), registerUser);
//////


router.post("/addUser", addUser); //from admin
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/get-users",  getAllUsers);
router.post("/get-pictures",  getAllPic);
router.delete("/delete-user/:id", deleteUser);
router.patch("/block-user", blockUser);
router.patch("/unblock-user",  unBlockUser);
router
  .route("/profile/:id") // Include the ID parameter in the route
  .get( getUserProfile)
  .put( updateUserProfile);
 router.patch("/updateUserRoleToAdmin/:id", updateUserRoleToAdmin);

 router.post('/verify-email', async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.verificationCode === code) {
      user.isVerified = true;
      await user.save();
      return res.status(200).json({ message: "Email successfully verified" });
    } else {
      return res.status(400).json({ message: "Invalid verification code" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
const bcrypt = require('bcryptjs');

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found.');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const mailOptions = {
      from: 'linkuptournament@outlook.com',
      to: email,
      subject: 'Password Reset',
      text: `Please use the following link to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).send('Error sending email.');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Reset password link sent to your email.');
      }
    });
  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).send(`Server error: ${error.message}`);
  }
}); 
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log("Received token:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Directly set the new password and rely on pre-save middleware to hash it
    user.password = password;
    await user.save();

    // Optionally, fetch and log the password from DB to confirm it's updated
    const updatedUser = await User.findById(decoded._id);
    console.log("Updated password from DB:", updatedUser.password);

    res.send({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.log("Error verifying token or saving new password:", error);
    return res.status(500).send('Failed to reset password. ' + error.message);
  }
}); 
router.post('/face', uploadd.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded.');
  }

  const pythonExecutable = 'C:/Program Files/Python311/python';
  const scriptPath = 'C:/Users/sinoh/Desktop/py/face.py';
  const imagePath = req.file.path;

  const pythonProcess = spawn(pythonExecutable, [scriptPath, imagePath]);

  let dataToSend = '';
  pythonProcess.stdout.on('data', (data) => {
    dataToSend += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      res.status(500).send(`Python script error with exit code ${code}`);
    } else {
      try {
        const jsonData = JSON.parse(dataToSend); // Ensure this is parsed as JSON
        res.send(jsonData);
      } catch (error) {
        res.status(500).send('Failed to parse Python output as JSON');
      }
    }
  });
});

 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};
 
router.post('/imglogin', async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Simulate a successful login
    res.json({
      _id: user._id,
      email: user.email,
       token: generateToken(user._id)
      // _id: user._id,
      // username: user.username,
      // firstName: user.firstName,
      // lastName: user.lastName,
      // email: user.email,
      // role: user.role,
      // isAdmin: user.isAdmin,
      // pic: user.pic,
      // certification: user.certification,
      // isVerified:user.isVerified,
      // isDeleted: user.isDeleted,
      // blocked:user.blocked,

      // token: generateToken(user),
     
      
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
////////////////
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
