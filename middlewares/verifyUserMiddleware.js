//? ===================================================== User Authentication Middleware =====================================================

const { BadRequestError, NotAuthorizedError } = require("base-error-handler");
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
  
 
const verifyUser = asyncHandler(async (req, res, next) => {

    //const decodedJwtPayload = req.currentUser;

    // Search the Db with the userId obtained after decoding jwt payload to Verify the userId claimed by JWT Payload is valid.
     const requestUser = await User.findById(decodedJwtPayload.id).select('-password');

     if (requestUser) {
    
         // If the user is blocked - deny access.
         const blockedUser = requestUser.isBlocked();

         if (blockedUser) {
            throw new NotAuthorizedError();
        }

        req.user = requestUser; // Set the request user with the user data fetched from the Db

        // next(); // Proceed to the next function as the user is authenticated as Admin
 
        let token;

        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          try {
            token = req.headers.authorization.split(" ")[1];
      
            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);  
            
            req.user = await User.findById(decoded.id).select("-password");
      
            next();
      
          } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
          }
       }
      
        if (!token) {
          res.status(401);
          throw new Error("Not authorized, no token");
        }
      






    } else {
        
        throw new BadRequestError("Invalid User - User Authentication Failed.");

    }

});

module.exports = verifyUser;



 
 