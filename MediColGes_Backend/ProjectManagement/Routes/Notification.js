const express = require("express");
const router = express.Router();
const NotificationProject = require("../ProjectModel/Notification");

// @route GET api/notifications
// @desc Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await NotificationProject.find();
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/notifications/addNotification
// @desc Add a new notification
router.post("/addNotification", async (req, res) => {
  try {
    const newNotification = new NotificationProject({
      ...req.body,
      isDeleted: false,
    });
    const notification = await newNotification.save();
    res.status(201).send({
      success: { msg: "Notification created successfully", notification },
    });
  } catch (err) {
    res.status(400).send({ errors: [{ msg: err.message }] });
  }
});

// @route DELETE api/notifications/deleteAll/:ownerId
// @desc Delete all notifications for a specific owner
router.delete("/deleteAll/:ownerId", async (req, res) => {
  const { ownerId } = req.params;
  try {
    await NotificationProject.updateMany(
      { owner: ownerId },
      { $set: { isDeleted: true } }
    );
    res.status(200).send({ success: { msg: "All notifications deleted" } });
  } catch (err) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

// @route DELETE api/notifications/deleteNotification/:notificationId
// @desc Delete a single notification
router.delete("/deleteNotification/:_id", async (req, res) => {
    const { _id } = req.params;
  try {
    await NotificationProject.findByIdAndUpdate(
      { _id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    res.status(200).send({ success: { msg: "Notification deleted" } });
  } catch (err) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = router;
