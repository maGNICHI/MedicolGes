const express = require("express");
const router = express.Router();

const Feedback = require("../ProjectModel/Feedback");

// @route GET api/feedback
// @desc Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addFeedback", async (req, res) => {
    try {
        const newFeedback = new Feedback({...req.body, isDeleted: false});
        const feedback = await newFeedback.save();
        res.status(201).send({success : {msg:"Feedback created successfuly" , feedback}});
    } catch (err) {
        res.status(400).send({errors : [{msg: err.message}]});
    }
});

router.get("/project/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const feedback = await Feedback.find({ projectId }); // Corrected query
    res.json({ success: { feedback } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.put("/updateFeedback/:_id", async (req, res) => {
  const { _id } = req.params;
  const resFound = req.body;
  try {
    const updatedRes = await Feedback.updateOne({ _id }, { $set: resFound });
    res
      .status(200)
      .send({ success: { msg: "Feedback updated successfuly", updatedRes } });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

router.delete("/deleteFeedback/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedFeedback = await Feedback.findOneAndDelete({ _id });
    res
      .status(200)
      .send({
        success: { msg: "Feedback deleted successfuly", deletedFeedback },
      });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const feedback = await Feedback.findById({ _id });
    if (!feedback) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Feedback not found" }] });
    }
    res
      .status(200)
      .send({ success: { msg: "Feedback found successfuly", feedback } });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
});

const updateIsDeleted = async (_id) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      _id, 
      { isDeleted: true },
      { new: true }
    );
    return updatedFeedback;
  } catch (err) {
    throw err; 
  }
}

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await updateIsDeleted(id);
    
    res.status(200).json({ message: 'Feedback deleted' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;
