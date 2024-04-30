const User = require("../Model/User");
const generateToken = require("../../generateToken");
const { uploads } = require('../../cloudinary');
const asyncHandler = require("express-async-handler");
const {destroyAuthToken} = require("../Middleware/AuthMiddleware");
//@description     Register new user
//@route           POST /api/user/
//@access          Public

const nodemailer = require('nodemailer');
const crypto = require('crypto');

const registerUser = async (req, res) => {
  const { gender, username, firstName, lastName, email, password, role } = req.body;

  try {
    if (!gender || !username || !firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate verification code
    const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();

    // Email transport configuration
    const transporter = nodemailer.createTransport({
      service: 'outlook', // Or your email service provider
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email message options
    const mailOptions = {
      from: 'linkuptournament@outlook.com',
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is ${verificationCode}. Enter this code to complete your registration.`
    };

    // Send email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send verification email" });
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


    

 


    let picUrl = req.files && req.files['pfp'] ? (await uploads(req.files['pfp'][0].path)).url : undefined;
    let certificationUrl = req.files && req.files['certification'] ? (await uploads(req.files['certification'][0].path)).url : undefined;
    const blocked = role === 'Professional' || role === 'Initiator';
    const user = await User.create({
      gender,
      username,
      firstName,
      lastName,
      email,
      password,
      role,
      pic: picUrl,
      blocked,
      certification: certificationUrl,
      isDeleted: false,
      verificationCode,
      isVerified: false
    });

    return res.status(201).json({
      _id: user._id,
      gender: user.gender,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
            pic: user.pic,
            certification: user.certification,
            isDeleted: user.isDeleted,
            token: generateToken(user),
      message: "Please verify your email to complete the registration."
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const jwt = require("jsonwebtoken");
// const nodemailer = require('nodemailer');
// require('dotenv').config(); // This line should be at the very top of your main file
// const { sendVerificationEmail } = require('./mail')


// const sendVerificationEmail = async (userEmail, verificationToken) => {
//   const transporter = nodemailer.createTransport({
//     service: 'outlook', // Use your preferred service
//     auth: {
//       user: 'linkuptournament@outlook.com',
//       pass: 'linkup123',
//     },
//   });

//   const mailOptions = {
//     from: 'linkuptournament@outlook.com',
//     to: userEmail,
//     subject: 'Verify Your Email',
//     text: `Please verify your email by entering this code: ${verificationToken}`,
//   };

//   await transporter.sendMail(mailOptions);
// };


 


// const registerUser = async (req, res) => {
//   const { gender, username, firstName, lastName, email, password, role } = req.body;

//   try {
//     if (!gender || !username || !firstName || !lastName || !email || !password || !role) {
//       return res.status(400).json({ message: "Please enter all the fields" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     let picUrl = req.files && req.files['pfp'] ? (await uploads(req.files['pfp'][0].path)).url : undefined;
//     let certificationUrl = req.files && req.files['certification'] ? (await uploads(req.files['certification'][0].path)).url : undefined;
//     const blocked = role === 'Professional' || role === 'Initiator';
//     const user = await User.create({
//       gender,
//       username,
//       firstName,
//       lastName,
//       email,
//       password,
//       role,
//       pic: picUrl,
//       blocked,
//       certification: certificationUrl,
//       isDeleted: false
//     });

//     return res.status(201).json({
//       _id: user._id,
//       gender: user.gender,
//       username: user.username,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//       isAdmin: user.isAdmin,
//       pic: user.pic,
//       certification: user.certification,
//       isDeleted: user.isDeleted,
//       token: generateToken(user),
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


//@description     Auth the user
//@route           POST /api/users/login
// //@access          Public
// const authUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     // const bcrypt = require('bcryptjs');
//     // const hash = '$2a$10$5DmUEyhS51yA51dUwAGuc./yp2M.EarTYOKNRLyO9lNoj3bV.3px2'; // New hash
//     // bcrypt.compare('a', hash, (err, res) => {
//     //   console.log('Match:', res); // Should print true if 'yourTestPassword' is the correct password
//     // });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid Email or Password" });
//     }
    
//     if (user.blocked) {
//       return res.status(401).json({ success: false, error: 'Your account is blocked.' });
//     }
//     if (user.twoFactorAuth && user.twoFactorAuth.enabled) {
//       return res.json({
//         success: true,
//         twoFactorRequired: true,
//         userId: user._id,
//         message: "2FA is enabled. Please verify using your 2FA application."
//       });
//     }

//     // If 2FA is not enabled, redirect to QR code page for setup
//     if (user.twoFactorAuth && !user.twoFactorAuth.enabled) {
//       return res.json({
//         success: true,
//         twoFactorSetupRequired: true,
//         userId: user._id,
//         message: "2FA is not enabled. Please set up using the QR code."
//       });
//     }


   
//     return res.json({
//       _id: user._id,
//       username: user.username,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//       isAdmin: user.isAdmin,
//       pic: user.pic,
//       certification: user.certification,
//       isVerified:user.isVerified,
//       isDeleted: user.isDeleted,
//       blocked:user.blocked,

//      // token: generateToken(user),
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    if (user.blocked) {
      return res.status(401).json({ success: false, error: 'Your account is blocked.' });
    }

    const twoFAStatus = user.twoFactorAuth && user.twoFactorAuth.enabled;

    // Check if 2FA is setup but not enabled
    if (user.twoFactorAuth && !user.twoFactorAuth.enabled) {
      return res.json({
        success: true,
        twoFactorSetupRequired: true,
        twoFactorEnabled: false,  // Reflect actual enabled status
        userId: user._id,
        message: "2FA is not enabled. Please set up using the QR code."
      });
    }

    // User has 2FA enabled and has previously verified it successfully
    if (twoFAStatus) {
      const token = generateToken(user);  // Assuming generateToken handles token creation
      return res.json({
        success: true,
        twoFactorRequired: false,
        token: token,
        userId: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        pic: user.pic,
        certification: user.certification,
        isVerified: user.isVerified,
        isDeleted: user.isDeleted,
        blocked: user.blocked
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};






const logoutUser = asyncHandler(async (req, res) => {
  
  destroyAuthToken(res);

  res.status(200).json({ message: "User Logged Out" });
});
module.exports = { registerUser, authUser,logoutUser };
