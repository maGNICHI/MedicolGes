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
  
  module.exports = destroyAuthToken;
  