const jwt = require('jsonwebtoken');

const generateAuthToken = (res, userId, userEmail,userName) => {
  // Creating a new json web token with userId and secret key
  const jwtToken = jwt.sign({ id: userId, email: userEmail ,name:userName}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_DURATION });

  const cookieOptions = {
    httpOnly: true, // To prevent cookies from being accessed by client-side scripts
    secure: process.env.NODE_ENV !== 'development', // Value will be false in the development environment and hence http will be allowed in development
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // Sets expiry of the cookie to 30 days
  };

  //res.cookie('jwt', jwtToken, cookieOptions);
  return jwtToken;
};


 

// const generateAuthToken = (userId, userEmail,userName) => {
//   // Creating a new json web token with userId and secret key
//   const jwtToken = jwt.sign({ id: userId, email: userEmail,name:userName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_DURATION });

//   return jwtToken;
// };

// const generateAuthToken = (_id) => {
//   return jwt.sign({_id},process.env.SECRET,{ expiresIn:'1h'})
// }
 module.exports = generateAuthToken;

