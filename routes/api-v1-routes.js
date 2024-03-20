//? ===================================================== V1 Routes =====================================================

// ===================== Importing necessary modules/files =====================
const express = require("express");
 
// ES6 import statements
// Using require syntax
const userRoutes = require("./api-v1/userRoutes.js");
const adminRoutes = require("./api-v1/adminRoutes.js");
 
// ===================== Configuring Express Router =====================
const router = express.Router();

//* ==================== V1 Routes ====================
 
router.use("/user", userRoutes);

router.use("/admin", adminRoutes);

module.exports = router;