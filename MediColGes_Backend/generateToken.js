const jwt = require("jsonwebtoken");

// Modify the generateToken function to include user data in the payload
const generateToken = (user) => {
  return jwt.sign({ 
    id: user._id,
    gender: user.gender,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin,
    pic: user.pic,
    isDeleted: user.isDeleted
    // Add any other user data you want to include in the token
  }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
