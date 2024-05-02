
const User = require("../Model/User");

const asyncHandler = require("express-async-handler");
const {
  fetchAllUsers,
  updateUser,fetchAllPic,
  blockUserHelper,
  unBlockUserHelper
} = require("./fct.js");
const { uploads } = require('../../cloudinary');
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
    const users = await User.find({ ...keyword, role: { $in: ["admin", "initiator", "participative_member", "Coordinator_Member", "Professionnal"] } });
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
      return res.status(404).json({ message: 'User not found' });
  }

  // Update user details from request body
  user.username = req.body.username || user.username;
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;

  // Handle password updates with hashing in your model's middleware
  if (req.body.password) {
      user.password = req.body.password;
  }

  
// Handle profile picture upload
if (req.files && req.files['pfp']) {
  const result = await uploads(req.files['pfp'][0].path);
  user.pic = result.url; // Ensure that the 'url' property exists in the resolved object
}


  const updatedUser = await user.save();

  res.status(200).json({
      id: updatedUser._id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin
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



const getAllPic = asyncHandler(async (req, res) => {
  const usersData = await fetchAllPic();

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
      isVerified:true,
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

    user.role = 'Professionnal';
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
  updateUserProfile,addUser,deleteUser,updateUserRoleToAdmin ,getAllPic};



 
