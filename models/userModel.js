// Importing required modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Enum for user roles
const Role = { Patient: 'Patient', Participative_Member: 'Participative_Member', Coordinator_Member: 'Coordinator_Member' };

// Creating user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blocked: {
        type: Boolean,
        default: false
    },
    profileImageName: {
        type: String
    },
    role: {
        type: String, enum: Object.values(Role)
    }
}, {
    timestamps: true // This will automatically add timestamps for any operations done.
});

// Password Hashing Middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
        // If the existing password in the user schema was not modified, then avoid hashing and move to the next middleware
        // This check is done here because the user schema will have other updates which don't involve password updation
        // in that case rehashing password will be skipped
    }
    const salt = await bcrypt.genSalt(10);

    // Hashing the new password using the salt generated by bcrypt
    this.password = await bcrypt.hash(this.password, salt);
});

// Password Verifying Function
userSchema.methods.matchPassword = async function (userProvidedPassword) {
    const validPassword = await bcrypt.compare(userProvidedPassword, this.password);
    return validPassword;
};

// Blocked Status Returning Function
userSchema.methods.isBlocked = function () {
    return this.blocked;
};

// Creating User model
const User = mongoose.model('User', userSchema);

// Exporting the User model
module.exports = User;
