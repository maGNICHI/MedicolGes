const Organization = require("../models/organization");
const upload = require("../../multer");
const cloudinary = require("../../cloudinary");
const fs = require("fs");
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
  try {
    const { name, address, phoneNumber, category, type , lien } = req.body;
  
    const newOrganization = new Organization({
      name,
      address,
      phoneNumber,
      category,
      type,
      lien,
    });
  
    const uploader = async (path) => await cloudinary.uploads(path, "Images");
    const uploadedImages = [];
  
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const { path } = file;
        const newPath = await uploader(path);
        uploadedImages.push(newPath.url); // Ajoutez seulement l'URL de l'image
        fs.unlinkSync(path);
      }
      newOrganization.image = uploadedImages;
    }
  
    const organization = await newOrganization.save();
    res.status(201).send(organization)
  } catch (error) {
    console.log("🚀 ~ exports.createOrganization= ~ error:", error)
    
  }
};
exports.updateOrganization = async (req, res) => {
  const organizationId = req.params.id;
  const { name, address, phoneNumber, category, type ,lien} = req.body;

  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { name, address, phoneNumber, category, type ,lien},
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
