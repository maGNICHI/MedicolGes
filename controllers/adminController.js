const asyncHandler = require("express-async-handler");
const AdminModel = require("../models/adminModel");
const {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError
} = require("base-error-handler");
const generateAuthToken = require("../utils/jwtHelpers/generateAuthToken");
const destroyAuthToken = require("../utils/jwtHelpers/destroyAuthToken");
const {
  fetchAllUsers,
  updateUser,
  blockUserHelper,
  unBlockUserHelper
} = require("../utils/adminHelpers");

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password must be provided.");
  }

  const admin = await AdminModel.findOne({ email: email });
  let passwordValid = false;

  if (admin) {
    passwordValid = await admin.matchPassword(password);
  }

  if (passwordValid) {
    generateAuthToken(res, admin._id, admin.email);
    const verifiedAdminData = {
      name: admin.name,
      email: admin.email,
    };
    res.status(200).json(verifiedAdminData);
  }

  if (!admin || !passwordValid) {
    throw new BadRequestError("Invalid Email or Password - Admin authentication failed.");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, adminRegistrationKey } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email or Password is missing in the request - Admin registration failed.");
  }

  if (!adminRegistrationKey) {
    throw new BadRequestError("No Admin Registration Access Code - Admin registration aborted.");
  } else {
    if (process.env.ADMIN_REGISTRATION_KEY !== adminRegistrationKey) {
      throw new NotAuthorizedError();
    }
  }

  const userExists = await AdminModel.findOne({ email });

  if (userExists) {
    throw new BadRequestError("Admin already exists.");
  }

  const user = await AdminModel.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    generateAuthToken(res, user._id, user.email);
    const registeredUserData = {
      name: user.name,
      email: user.email,
    };
    res.status(201).json(registeredUserData);
  } else {
    throw new BadRequestError("Invalid data - Admin registration failed.");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  destroyAuthToken(res);
  res.status(200).json({ message: "Admin Logged Out" });
});

const getAdminProfile = asyncHandler(async (req, res) => {
  const user = {
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json({ user });
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await AdminModel.findById(req.user._id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdminData = await admin.save();
    res.status(200).json({
      name: updatedAdminData.name,
      email: updatedAdminData.email,
    });
  } else {
    throw new NotFoundError();
  }
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
  const userId = req.body.userId;

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
  const userId = req.body.userId;

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

const updateUserData = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;

  if (!userId || !name || !email) {
    throw new BadRequestError("User data not received in request - User update failed.");
  }

  const userData = { userId: userId, name: name, email: email, role: role };

  const usersUpdateStatus = await updateUser(userData);

  if (usersUpdateStatus.success) {
    const response = usersUpdateStatus.message;
    res.status(200).json({ message: response });
  } else {
    throw new BadRequestError("User update failed.");
  }
});

module.exports = {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  blockUser,
  unBlockUser,
  updateUserData,
};
