const express = require("express");
const router = express.Router();

const Project = require("../ProjectModel/Project");

// @route GET api/project
// @desc Get all projects
router.get("/", async (req, res) => {
  try {
    const project = await Project.find();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addProject", async (req, res) => {
    try {
        const newProject = new Project({...req.body, isDeleted: false});
        const project = await newProject.save();
        res.status(201).send({success : {msg:"Project created successfuly" , project}});
    } catch (err) {
        res.status(400).send({errors : [{msg: err.message}]});
    }
});

router.put("/updateProject/:_id", async (req, res) => {
  const { _id } = req.params;
  const resFound = req.body;
  try {
    const updatedRes = await Project.updateOne({ _id }, { $set: resFound });
    res
      .status(200)
      .send({ success: { msg: "Project updated successfuly", updatedRes } });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

router.delete("/deleteProject/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedProject = await Project.findOneAndDelete({ _id });
    res
      .status(200)
      .send({
        success: { msg: "Project deleted successfuly", deletedProject },
      });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const project = await Project.findById({ _id });
    if (!project) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Project not found" }] });
    }
    res
      .status(200)
      .send({ success: { msg: "Project found successfuly", project } });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

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
}

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await updateIsDeleted(id);
    
    res.status(200).json({ message: 'Project deleted' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;
