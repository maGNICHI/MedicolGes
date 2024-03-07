const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organization.controller");

router.get("/", organizationController.readOrganization);
router.post("/", organizationController.createOrganization);
router.put("/:id", organizationController.updateOrganization);
router.delete("/:id", organizationController.deleteOrganization);

module.exports = router;
