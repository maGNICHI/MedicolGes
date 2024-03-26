//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
const express = require("express");

// Custom Authentication middleware from my npm package.
// Reference: https://www.npmjs.com/package/base-auth-handler
 

const verifyUser = require("../../middlewares/verifyUserMiddleware.js");

const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../../controllers/userController.js");

const {
  userSignUpDataValidation,
  userSignInDataValidation,
} = require("./backendDataValidationConfig.js");

const { multerUploadUserProfile } = require("../../config/multerConfig.js");

// ===================== Configuring Express Router =====================
const router = express.Router();

//? =============================== Routes ===============================

//* ==================== Authentication Routes ====================
router.post("/", userSignUpDataValidation , registerUser);
router.post("/auth", userSignInDataValidation,   authUser);
router.post("/logout", logoutUser);
//* ==================== User Profile Routes ====================

router
  .route("/profile/:id") // Include the ID parameter in the route
  .get( getUserProfile)
  .put( updateUserProfile);

 
  
// In the above line, the route is same, above line will use the specified controller according to the type of the request

module.exports = router;
