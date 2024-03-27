const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin // Include role in token payload
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN // Set token expiration time
    }
  );
};

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const destroyAuthToken = (res) => {
  // Empty string to place in the cookie instead of token
  const jwtToken = '';
  const cookieOptions = {
    httpOnly: true, // To prevent cookies from being accessed by client-side scripts
    secure: process.env.NODE_ENV !== 'development', // Value will be false in the development environment and hence http will be allowed in development
    sameSite: 'strict',
    maxAge: 0, // Set maxAge to 0 so that the cookie will expire right away.
  };

  res.cookie('jwt', jwtToken, cookieOptions);
};


module.exports = { protect, generateToken, destroyAuthToken };

 