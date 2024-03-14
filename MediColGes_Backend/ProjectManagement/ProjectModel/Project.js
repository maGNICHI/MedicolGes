const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted: Boolean,
    file: String,
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    numberFollowers: {
        type: Number,
        default: 0,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Project = mongoose.model("project", ProjectSchema);
