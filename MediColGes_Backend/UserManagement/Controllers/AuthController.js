const User = require("../Model/User");
const generateToken = require("../../generateToken");
const { uploads } = require('../../cloudinary');
const asyncHandler = require("express-async-handler");
const {destroyAuthToken} = require("../Middleware/AuthMiddleware");
//@description     Register new user
//@route           POST /api/user/
//@access          Public
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
      isDeleted: false
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
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    return res.json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      pic: user.pic,
      certification: user.certification,
      isDeleted: user.isDeleted,
      blocked:user.blocked,
      token: generateToken(user),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const logoutUser = asyncHandler(async (req, res) => {
  
  destroyAuthToken(res);

  res.status(200).json({ message: "User Logged Out" });
});
module.exports = { registerUser, authUser,logoutUser };
