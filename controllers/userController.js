// Importing necessary modules/files
const asyncHandler = require("express-async-handler");
const { BadRequestError } = require("base-error-handler");
const User = require("../models/userModel.js");
const generateAuthToken = require("../utils/jwtHelpers/generateAuthToken.js");
const destroyAuthToken = require("../utils/jwtHelpers/destroyAuthToken.js");

// Authentication user controller
// const authUser = asyncHandler(async (req, res) => {
//   /*
//      # Desc: Auth user/set token
//      # Route: POST /api/v1/user/auth
//      # Access: PUBLIC
//     */

//   const { email, password } = req.body;

//   if (!email || !password) {
//     // If email or password is empty, return error
//     throw new BadRequestError("Email or Password is missing in the request - User authentication failed.");
//   }

//   // Find the user in Db with the email and password
//   const user = await User.findOne({ email: email });

//   let passwordValid = false;

//   if (user) {
//     passwordValid = await user.matchPassword(password);
//   }

//   if (passwordValid) {
//     // If password verified, check user-blocked status. send response back with jwt token
//     const blockedUser = user.isBlocked();

//     if (blockedUser) {
//       throw new BadRequestError("Access Blocked - Contact Server Admin.");
//     }

//     // If password verified and user is not-blocked, send response back with jwt token
//     generateAuthToken(res, user._id, user.email);
    
//     let registeredUserData = {
//       name: user.name,
//       email: user.email,
      
       
//     };

//     if (user.profileImageName) {
//       registeredUserData.profileImageName = user.profileImageName;
//     }
//     res.status(201).json(registeredUserData);
     
//   }

//   if (!user || !passwordValid) {
//     // If user or user password is not valid, send error back
//     throw new BadRequestError("Invalid Email or Password - User authentication failed.");
//   }
// });


// Assuming destroyAuthToken remains unchanged unless you provided its usage context related to localStorage.

// Authentication user controller
const authUser = asyncHandler(async (req, res) => {
  /*
     # Desc: Auth user/set token
     # Route: POST /api/v1/user/auth
     # Access: PUBLIC
    */

  const { email, password } = req.body;

  if (!email || !password) {
    // If email or password is empty, return error
    throw new BadRequestError("Email or Password is missing in the request - User authentication failed.");
  }

  // Find the user in the database with the given email
  const user = await User.findOne({ email: email });

  let passwordValid = false;

  if (user) {
    passwordValid = await user.matchPassword(password);
  }

  if (passwordValid) {
    // If password verified and user is not blocked
    const blockedUser = user.isBlocked();

    if (blockedUser) {
      throw new BadRequestError("Access Blocked - Contact Server Admin.");
    }

    // Generate JWT token
    const token = generateAuthToken(user._id, user.email,user.name);
    
    let registeredUserData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: `${token}`, // Include the token in the response
    };

    if (user.profileImageName) {
      registeredUserData.profileImageName = user.profileImageName;
    }
    res.status(201).json(registeredUserData);
     
  } else {
    // If user or user password is not valid, send error back
    throw new BadRequestError("Invalid Email or Password - User authentication failed.");
  }
});


// // Register user controller
// const registerUser = asyncHandler(async (req, res) => {
//   /*
//      # Desc: Register new user
//      # Route: POST /api/v1/user/auth
//      # Access: PUBLIC
//     */

//   const { name, email, password, role } = req.body;

//   // Check if user already exists
//   const userExists = await User.findOne({ email });

//   // If the user already exists, throw an error
//   if (userExists) {
//     throw new BadRequestError("User already registered - Sign-Up Failed.");
//   }

//   // Store the user data to DB if the user doesn't exist already.
//   const user = await User.create({
//     name: name,
//     email: email,
//     password: password,
//     role: role
//   });

//   if (user) {
//     // If user is created, send response back with jwt token
//     generateAuthToken(res, user._id, user.email);

//     const registeredUserData = {
//       name: user.name,
//       email: user.email,
//       role: user.role
//     };

//     res.status(201).json(registeredUserData,);
//   } else {
//     // If user was NOT Created, send error back
//     throw new BadRequestError("Invalid User data - User registration failed.");
//   }
// });

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,role } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    throw new BadRequestError("Please add all fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError("User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role  
  });

  if (user) {
    const token = generateAuthToken(user._id, user.email,user.name);
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: `${token}`,
    });
  } else {
    throw new BadRequestError("Invalid user data");
  }
});
// Logout user controller
const logoutUser = asyncHandler(async (req, res) => {
  /*
     # Desc: Logout user / clear cookie
     # Route: POST /api/v1/user/logout
     # Access: PUBLIC
    */

  destroyAuthToken(res);

  res.status(200).json({ message: "User Logged Out" });
});

// Get user profile controller
const getUserProfile = asyncHandler(async (req, res) => {
  /*
     # Desc: Get user profile
     # Route: GET /api/v1/user/profile
     # Access: PRIVATE
    */

  const user = {
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    profileImageName: req.user.profileImageName,
  };

  res.status(200).json({ user });
});

// Update user profile controller


const updateUserProfile = asyncHandler(async (req, res) => {
  /*
     # Desc: Update user profile
     # Route: PUT /api/v1/user/profile
     # Access: PRIVATE
    */

  // Find the user data with the user id in the request object
  const user = await User.findById(req.user._id);

  if (user) {
    // Update the user with new data if found or keep the old data itself.
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    // If request has a new password, update the user with the new password
    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.file) {
      user.profileImageName = req.file.filename || user.profileImageName;
    }

    const updatedUserData = await user.save();

    // Send the response with updated user data
    res.status(200).json({
      name: updatedUserData.name,
      email: updatedUserData.email,
      role: updatedUserData.role,
      profileImageName: updatedUserData.profileImageName,
    });
  } else {
    throw new BadRequestError("User not found.");
  }
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
