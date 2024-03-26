const jwt = require('jsonwebtoken');


const generateAuthToken = (  userId, userEmail) => {

  // Creating a new json webtoken with userId and secret key
  const jwtToken = jwt.sign({id: userId, email: userEmail}, process.env.JWT_KEY, { expiresIn: process.env.JWT_TOKEN_DURATION } );

   
  
return jwtToken
};


module.exports = generateAuthToken;

 

// const generateAuthToken = (userId, userEmail,userName) => {
//   // Creating a new json web token with userId and secret key
//   const jwtToken = jwt.sign({ id: userId, email: userEmail,name:userName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_DURATION });

//   return jwtToken;
// };

// const generateAuthToken = (_id) => {
//   return jwt.sign({_id},process.env.SECRET,{ expiresIn:'1h'})
// }

