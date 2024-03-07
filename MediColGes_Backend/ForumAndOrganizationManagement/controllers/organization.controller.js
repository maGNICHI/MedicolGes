const Organization = require("../models/organization");

exports.readOrganization = async (req, res) => {
  try {
    const organizations = await Organization.find()
      .sort({ createdAt: -1 })
      .exec();
    res.send(organizations);
  } catch (error) {
    console.error("Error to get data:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createOrganization = async (req, res) => {
  const { name, address, phoneNumber, category, type } = req.body;

  const newOrganization = new Organization({
    name,
    address,
    phoneNumber,
    category,
    type,
  });

  try {
    const organization = await newOrganization.save();
    return res.status(201).json(organization);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateOrganization = async (req, res) => {
  const organizationId = req.params.id;
  const { name, address, phoneNumber, category, type } = req.body;

  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { name, address, phoneNumber, category, type },
      { new: true }
    );
    if (!updatedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json(updatedOrganization);
  } catch (error) {
    console.error("Error updating organization:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteOrganization = async (req, res) => {
  const organizationId = req.params.id;

  try {
    const deletedOrganization = await Organization.findByIdAndDelete(
      organizationId
    );
    if (!deletedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json({
      message: "Organization deleted successfully",
      deletedOrganization,
    });
  } catch (error) {
    console.error("Error deleting organization:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
