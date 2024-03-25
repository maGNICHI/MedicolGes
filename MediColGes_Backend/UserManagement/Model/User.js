const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["Mr", "Mrs"],
      required: true,
      default: "Mr",
    },
    username: { type: "String", required: true },
    firstName: { type: "String", required: true },
    lastName: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    role: {
      type: String,
      enum: ["super admin", "admin", "initiator", "Patient", "participative_member" ],
      required: true,
      default: "participative_member",
    },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    certification: {
      type: "String"
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: Boolean,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model("User", UserSchema);
