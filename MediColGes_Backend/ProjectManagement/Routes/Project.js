const express = require("express");
const router = express.Router();
const Project = require("../ProjectModel/Project");
const Organization = require("../../ForumAndOrganizationManagement/models/organization");
const multer = require("multer");
const path = require("path");
const transporter = require("../../transporter")();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
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
    // Check if file was uploaded
    const fileName = req.file ? path.basename(req.file.path) : null;

    // Create new project instance
    const newProject = new Project({
      ...req.body,
      isDeleted: false,
      file: fileName, // Assign the file name to the file property
    });

    // Save the project to the database
    const project = await newProject.save();

    // Send success response
    res.status(201).send({
      success: { msg: "Project created successfully", project },
    });
  } catch (err) {
    // Handle errors
    console.error("Error adding project:", err);
    res.status(500).send({ error: "Failed to add project. Please try again later." });
  }
});

router.get("/download/:fileName", (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, "../../uploads", fileName); // Adjust the path as per your file structure
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
    const updatedRes = await Project.findByIdAndUpdate(
      _id,
      { $set: resFound },
      { new: true }
    );
    res
      .status(200)
      .send({ success: { msg: "Project updated successfully", updatedRes } });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

// Route to delete a project
router.delete("/deleteProject/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedProject = await Project.findOneAndDelete({ _id });
    res.status(200).send({
      success: { msg: "Project deleted successfully", deletedProject },
    });
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
    res
      .status(200)
      .send({ success: { msg: "Project found successfully", project } });
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
      return res
        .status(400)
        .send({ errors: [{ msg: "Organization not found" }] });
    }
    res.status(200).send({
      success: { msg: "Organization found successfully", organization },
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

// Function to update the isDeleted field
const updateIsDeleted = async (_id) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      _id,
      { isDeleted: true },
      { new: true }
    );
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
      return res
        .status(400)
        .json({ error: "User is already following the project" });
    }
    project.followers.push(userId);
    project.numberFollowers += 1;
    await project.save();

    res
      .status(200)
      .json({ message: "User is now following the project", project });
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
      return res
        .status(400)
        .json({ error: "User is not following the project" });
    }

    // Find the index of userId in the followers array
    const index = project.followers.indexOf(userId);
    if (index !== -1) {
      // Remove userId from the followers array
      project.followers.splice(index, 1);
    }

    // Update the number of followers
    project.numberFollowers = Math.max(0, project.numberFollowers - 1);

    // Save the updated project
    await project.save();

    res
      .status(200)
      .json({ message: "User has unfollowed the project", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Route to send invitation through email
router.post("/shareProject/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { emails } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #007bff; margin-bottom: 20px;">Invitation to Collaborate on a Project</h2>
        <p style="font-size: 16px; color: #444;">You have been invited to collaborate on a project titled ${project.name}.</p>
        <p style="font-size: 16px; color: #444;">Click the button below to access the project:</p>
        <a href="http://localhost:3000/projects/consult/${projectId}?#details" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Access Project</a>
      </div>
    </div>
  `;
    const emailPromises = emails.map((email) => {
      const mailOptions = {
        from: "prof.dev64@gmail.com",
        to: email,
        subject: "Invitation to Collaborate on a Project",
        html: htmlContent,
      };

      return transporter.sendMail(mailOptions);
    });
    await Promise.all(emailPromises);
    project.sharedEmails.push(...emails);
    await project.save();
    res.status(200).json({ message: "Project shared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
