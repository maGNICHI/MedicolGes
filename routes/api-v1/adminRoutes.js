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

router.post("/", adminSignUpDataValidation, validateRequest, registerAdmin);
router.post("/auth", adminSignInDataValidation, validateRequest, authAdmin);
router.post("/logout", logoutAdmin);

router
  .route("/profile")
  .get(requireAuth, verifyAdmin, getAdminProfile)
  .put(requireAuth, verifyAdmin, updateAdminProfile);

router.post("/get-users", requireAuth, verifyAdmin, getAllUsers);
router.patch("/block-user", requireAuth, verifyAdmin, adminUserBlockingDataValidation, validateRequest, blockUser);
router.patch("/unblock-user", requireAuth, verifyAdmin, adminUserBlockingDataValidation, validateRequest, unBlockUser);
router.put("/update-user", requireAuth, verifyAdmin, adminUserUpdateDataValidation, validateRequest, updateUserData);

module.exports = router;
