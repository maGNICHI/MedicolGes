//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
const express = require("express");

// Custom Authentication middleware from my npm package.
// Reference: https://www.npmjs.com/package/base-auth-handler
const { requireAuth, validateRequest } = require("base-auth-handler");

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
router.post("/", userSignUpDataValidation, validateRequest, registerUser);
router.post("/auth", userSignInDataValidation, validateRequest, authUser);
router.post("/logout", logoutUser);
//* ==================== User Profile Routes ====================

router
  .route("/profile")
  .get(requireAuth, verifyUser, getUserProfile)
  .put(
    requireAuth,
    verifyUser,
    multerUploadUserProfile.single("profileImage"),
    updateUserProfile
  );
// In the above line, the route is same, above line will use the specified controller according to the type of the request

module.exports = router;
