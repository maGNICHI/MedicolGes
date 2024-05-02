const mongoose = require("mongoose");

const NotificationProjectSchema = new mongoose.Schema(
  {
    userAction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    action: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isOpened: Boolean,
    isDeleted: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = NotificationProject = mongoose.model("notification", NotificationProjectSchema);
