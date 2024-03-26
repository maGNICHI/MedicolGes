const express = require("express");
const { requireAuth, validateRequest } = require("base-auth-handler");
const verifyAdmin = require("../../middlewares/verifyAdminMiddleware.js");

const router = express.Router();

const {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  updateUserData,
  blockUser,
  unBlockUser,
} = require("../../controllers/adminController.js");

// Data validation configuration
const {
  adminSignInDataValidation,
  adminSignUpDataValidation,
  adminUserBlockingDataValidation,
  adminUserUpdateDataValidation,
} = require("./backendDataValidationConfig.js");

router.post("/", adminSignUpDataValidation,  registerAdmin);
router.post("/auth", adminSignInDataValidation , authAdmin);
router.post("/logout", logoutAdmin);

router
  .route("/profile/:id")
  .get(   getAdminProfile)
  .put(    updateAdminProfile);

router.post("/get-users",    getAllUsers);
router.patch("/block-user",      blockUser);
router.patch("/unblock-user",    adminUserBlockingDataValidation,   unBlockUser);
router.put("/update-user",    adminUserUpdateDataValidation,   updateUserData);

module.exports = router;
