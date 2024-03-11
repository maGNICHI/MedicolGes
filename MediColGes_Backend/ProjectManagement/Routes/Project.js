const express = require("express");
const router = express.Router();
const Project = require("../ProjectModel/Project");
const multer = require('multer');
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// @route GET api/project
// @desc Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
    .sort({ createdAt: -1 })
    .exec();;
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route to add a new project
router.post("/addProject", upload.single("file"), async (req, res) => {
  try {
    const newProject = new Project({
      ...req.body,
      isDeleted: false,
      file: req.file ? req.file.path : null
    });
    const project = await newProject.save();
    res.status(201).send({
      success: { msg: "Project created successfully", project },
    });
  } catch (err) {
    res.status(400).send({ errors: [{ msg: err.message }] });
  }
});

// Route to update a project
router.put("/updateProject/:_id", async (req, res) => {
  const { _id } = req.params;
  const resFound = req.body;
  try {
    const updatedRes = await Project.findByIdAndUpdate(_id, { $set: resFound }, { new: true });
    res.status(200).send({ success: { msg: "Project updated successfully", updatedRes } });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

// Route to delete a project
router.delete("/deleteProject/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedProject = await Project.findOneAndDelete({ _id });
    res.status(200).send({ success: { msg: "Project deleted successfully", deletedProject } });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

// Route to get a project by ID
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const project = await Project.findById(_id);
    if (!project) {
      return res.status(400).send({ errors: [{ msg: "Project not found" }] });
    }
    res.status(200).send({ success: { msg: "Project found successfully", project } });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

// Function to update the isDeleted field
const updateIsDeleted = async (_id) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(_id, { isDeleted: true }, { new: true });
    return updatedProject;
  } catch (err) {
    throw err;
  }
};

// Route to delete a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await updateIsDeleted(id);
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
