const express = require("express");
const router = express.Router();
const Project = require("../ProjectModel/Project");
const Organization = require("../../ForumAndOrganizationManagement/models/organization")
const multer = require('multer');
const path = require('path');

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
    const projects = await Project.find().sort({ createdAt: -1 }).exec();
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
      file: req.file ? path.basename(req.file.path) : null // Extracting only the file name
    });
    const project = await newProject.save();
    res.status(201).send({
      success: { msg: "Project created successfully", project },
    });
  } catch (err) {
    res.status(400).send({ errors: [{ msg: err.message }] });
  }
});

router.get("/download/:fileName", (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../../uploads', fileName); // Adjust the path as per your file structure
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(404).json({ error: "File not found" });
      }
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Internal server error" });
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

// Route to get a organization by ID
router.get("/organization/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const organization = await Organization.findById(_id);
    if (!organization) {
      return res.status(400).send({ errors: [{ msg: "Organization not found" }] });
    }
    res.status(200).send({ success: { msg: "Organization found successfully", organization } });
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

// Route to follow a project
router.post("/:projectId/follow", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;
    
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    if (project.followers.includes(userId)) {
      return res.status(400).json({ error: "User is already following the project" });
    }
    project.followers.push(userId);
    project.numberFollowers += 1;
    await project.save();

    res.status(200).json({ message: "User is now following the project", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Route to unfollow a project
router.delete("/:projectId/unfollow", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (!project.followers.includes(userId)) {
      return res.status(400).json({ error: "User is not following the project" });
    }

    project.followers = project.followers.filter(followerId => followerId !== userId);
    project.numberFollowers -= 1;
    await project.save();

    res.status(200).json({ message: "User has unfollowed the project", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
