const User = require("../Model/User");

const fetchAllUsers = async () => {
  try {
    const users = await User.find({}, { gender:1,username:1 , firstName:1, lastName: 1,email: 1, role: 1,pic:1 ,certification:1 ,isAdmin:1,isDeleted:1,isVerified:1,blocked:1 , createdAt : 1});

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);

    throw error;
  }
};

const fetchAllPic= async () => {
  try {
    const users = await User.find({}, { pic:1,email:1});

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);

    throw error;
  }
};

const blockUserHelper = async (_id) => {
  try {
    // Attempt to find the user by their _id
    const user = await User.findById(_id);

    if (!user) {
      // If the user wasn't found (already deleted or never existed), return a status indicating failure
      return { success: false, message: "User not found." };
    }

    user.blocked = true;
    // Save the updated user data
    await user.save();

    // If the user was successfully blocked, return a status indicating success
    return { success: true, message: "User blocked successfully." };

  } catch (error) {
    console.error("Error blocking user:", error);

    throw error;
  }
};

const unBlockUserHelper = async (_id) => {
  try {
    // Attempt to find the user by their _id
    const user = await User.findById(_id);

    if (!user) {
      // If the user wasn't found (already deleted or never existed), return a status indicating failure
      return { success: false, message: "User not found." };
    }

    user.blocked = false;
    // Save the updated user data
    await user.save();

    // If the user was successfully unblocked, return a status indicating success
    return { success: true, message: "User Un-blocked successfully." };

  } catch (error) {
    console.error("Error Un-blocking user:", error);

    throw error;
  }
};

const updateUser = async (userData) => {
  try {
    const user = await User.findById(userData.userId);

    if (!user) {
      // If the user wasn't found, return a status indicating failure
      return { success: false, message: "User not found." };
    }

    // Update user.name and user.email with the new values
    user.name = userData.name;
    user.email = userData.email;
    user.role = userData.role;

    // Save the updated user data
    await user.save();

    return { success: true, message: "User updated successfully." };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};



module.exports = { fetchAllUsers, blockUserHelper, unBlockUserHelper, updateUser,fetchAllPic };
