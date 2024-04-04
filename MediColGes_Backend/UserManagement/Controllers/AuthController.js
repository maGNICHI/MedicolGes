const User = require("../Model/User");
const generateToken = require("../../generateToken");
const { uploads } = require('../../cloudinary');

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

    let picUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    let certificationUrl = "";

    if (req.files) {
      const pfpPath = await uploads(req.files['pfp'][0].path);
      picUrl = pfpPath.url;

      if (req.files['certification']) {
        const certificationPath = await uploads(req.files['certification'][0].path);
        certificationUrl = certificationPath.url;
      }
    }

    const user = await User.create({
      gender,
      username,
      firstName,
      lastName,
      email,
      password,
      role,
      pic: picUrl,
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
      token: generateToken(user),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, authUser };
