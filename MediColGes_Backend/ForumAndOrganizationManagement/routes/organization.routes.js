const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organization.controller");
const upload = require("../../multer");

router.get("/", organizationController.readOrganization);
router.post(
  "/",
  upload.array("media"), // Utilisez upload.array() pour accepter plusieurs fichiers
  organizationController.createOrganization
);
router.put("/:id", organizationController.updateOrganization);
router.delete("/:id", organizationController.deleteOrganization);

module.exports = router;
