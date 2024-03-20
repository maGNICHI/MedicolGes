//? ===================================================== Admin Authentication Middleware =====================================================

const { BadRequestError } = require("base-error-handler");

const asyncHandler = require('express-async-handler');
const AdminModel = require('../models/adminModel.js');

const verifyAdmin = asyncHandler(async (req, res, next) => {

  const decodedJwtPayload = req.currentUser;

  // Search the Db with the userId obtained after decoding jwt payload to Verify the userId claimed by JWT Payload is valid.
  const requestUser = await AdminModel.findById(decodedJwtPayload.id).select('-password');

  if (requestUser) {
  
    req.user = requestUser; // Set the request user with the user data fetched from the Db

    next(); // Proceed to the next function as the user is authenticated as Admin

  } else {
      
    throw new BadRequestError("Invalid User - Admin Authentication Failed.");

  }

});

module.exports = verifyAdmin;
