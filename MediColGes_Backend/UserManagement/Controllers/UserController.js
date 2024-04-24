
const User = require("../Model/User");
const asyncHandler = require("express-async-handler");
const {
  fetchAllUsers,
  updateUser,
  blockUserHelper,
  unBlockUserHelper
} = require("./fct.js");

const allUsers = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UsersByRole = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find({ ...keyword, role: { $in: ["admin", "initiator", "participative_member"] } });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
const UsersById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId); // Use findById instead of find
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: { user } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}



////////////////coddeeee
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id; // Extracting ID from request params
  const user = await User.findById(userId).select('-password'); // Exclude password from the result

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  
  const userId = req.params.id; // Extracting ID from request params

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Only allow profile updates for the user making the request or an admin
  // Assuming you have a way to identify the user making the request (e.g., from req.user added by a middleware)
  // if (req.user.id !== userId && !req.user.isAdmin) {
  //   res.status(403);
  //   throw new Error('User not authorized to update this profile');
  // }

  // Update the user with new data or keep the old data
   
  user.username = req.body.username || user.username;
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  user.pic = req.body.pic || user.pic;
  user.certification = req.body.certification || user.certification;
  // user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
  // user.isDeleted = req.body.isDeleted !== undefined ? req.body.isDeleted : user.isDeleted;
  // user.blocked = req.body.blocked !== undefined ? req.body.blocked : user.blocked;

  if (req.body.password) {
    user.password = req.body.password; // Ensure you have password encryption handled, e.g., in Mongoose pre-save middleware
  }

  if (req.file) {
    user.profileImageName = req.file.filename || user.profileImageName;
  }

  const updatedUserData = await user.save();

  res.status(200).json({
    id: updatedUserData._id,
    name: updatedUserData.name,
    
    gender: updatedUserData.gender,
    username: updatedUserData.username,
    firstName: updatedUserData.firstName,
    lastName: updatedUserData.lastName,
    email: updatedUserData.email,
    role: updatedUserData.role,
    pic: updatedUserData.pic,
    certification: updatedUserData.certification,
    isAdmin: updatedUserData.isAdmin,
    isDeleted: updatedUserData.isDeleted,
    blocked: updatedUserData.blocked,
    // Depending on your needs, you might choose to return only specific fields
  });
});


const getAllUsers = asyncHandler(async (req, res) => {
  const usersData = await fetchAllUsers();

  if (usersData) {
    res.status(200).json({ usersData });
  } else {
    throw new NotFoundError();
  }
});


const blockUser = asyncHandler(async (req, res) => {
  const userId = req.body._id;

  if (!userId) {
    throw new BadRequestError("UserId not received in request - User blocking failed.");
  }

  const userBlockingProcess = await blockUserHelper(userId);
  const responseMessage = userBlockingProcess.message;

  if (userBlockingProcess.success) {
    res.status(201).json({ message: responseMessage });
  } else {
    throw new BadRequestError(responseMessage);
  }
});


const unBlockUser = asyncHandler(async (req, res) => {
  const userId = req.body._id;

  if (!userId) {
    throw new BadRequestError("UserId not received in request - User Un-blocking failed.");
  }

  const userUnblockingProcess = await unBlockUserHelper(userId);
  const responseMessage = userUnblockingProcess.message;

  if (userUnblockingProcess.success) {
    res.status(201).json({ message: responseMessage });
  } else {
    throw new BadRequestError(responseMessage);
  }
});

const addUser = async (req, res) => {
  const { gender, username, firstName, lastName, email, password, role  } = req.body;

  try {
    if (!gender || !username || !firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let picUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    let certificationUrl = "";

    if (req.files) {
      const pfpPath = await uploads(req.files['pfp'][0].path);
      picUrl = pfpPath.url;

      if (req.files['certification']) {
        const certificationPath = await uploads(req.files['certification'][0].path);
        certificationUrl = certificationPath.url;
      }
    }

    const user = await User.create({
      gender,
      username,
      firstName,
      lastName,
      email,
      password,
      role,
      pic: picUrl,
      certification: certificationUrl,
      isDeleted: false
    });

    return res.status(201).json({
      _id: user._id,
      gender: user.gender,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      pic: user.pic,
      certification: user.certification,
      isDeleted: user.isDeleted,
     
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const deleteUser = async (req, res) => {
//   const { id } = req.params;

//   const updatedUser = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

//   if (!updatedUser) {
//     return res.status(404).send('User not found');
//   }

//   res.send(`User with ID ${id} marked as deleted can't be undone.`);
// };
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).send('User not found');
  }

  res.send(`User with ID ${id} has been successfully deleted.`);
};

const updateUserRoleToAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.role = 'admin';
    await user.save();

    res.send(`User with ID ${id} has been updated to admin role.`);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};


module.exports = { allUsers, UsersByRole, UsersById,
  getAllUsers,
  blockUser,
  unBlockUser,
  getUserProfile,
  updateUserProfile,addUser,deleteUser,updateUserRoleToAdmin };



 
