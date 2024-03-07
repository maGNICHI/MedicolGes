const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Organization", "Industry", "Establishment"],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    // You can add other attributes specific to your organization schema here
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
