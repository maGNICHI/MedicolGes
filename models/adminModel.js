const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // This will automatically add timestamps for any operations done.
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

adminSchema.methods.matchPassword = async function (adminProvidedPassword) {
  const validPassword = await bcrypt.compare(adminProvidedPassword, this.password);
  return validPassword;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
