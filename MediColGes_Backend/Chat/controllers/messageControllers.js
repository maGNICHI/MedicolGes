const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../../UserManagement/Model/User");
const Chat = require("../models/chatModel");
const fs = require("fs");
const { uploads } = require('../../cloudinary'); // Update import statement

const allMessages = asyncHandler(async (req, res) => {
  try {
    //:chatId in routes //request params
    const messages = await Message.find({ chat: req.params.chatId })
    //utilisée pour remplacer l'ID de l'expéditeur par les inf
      .populate("sender", "name email")
      //utilisée pour remplacer l'ID du chat par les détails complets du chat 
      .populate("chat");

    res.json(messages);
    
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {

  const { content, chatId, isMedia, buffer:b  } = req.body;

  if ( !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  //image
  let picUrl = "";
  if (req.file) {
    console.log("File uploaded:", req.file); // Check if the file is uploaded correctly
    try {
      const uploadedImage = await uploads(req.file.path); // Use uploads function
      console.log("Uploaded image:", uploadedImage); // Check the URL of the uploaded image on Cloudinary
      picUrl = uploadedImage.url;
      fs.unlinkSync(req.file.path); // Delete the file from local storage after upload
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res.status(500).json({ error: "Error uploading image to Cloudinary" });
    }
  } else {
    console.log("No file uploaded");
  }
  //schema 
  var newMessage = {
    sender: req.user._id,
   // content: content,
    content,
    chat: chatId,
    isMedia,
    buffer:b?b:null,
    file: picUrl,
  };

  try {
    var message = await Message.create(newMessage);

    //populating the instance
    message = await message.populate("sender", "name");
    message = await message.populate("chat");

    //populating with the user in that chat field of our message doc instance
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
    console.log(buffer);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
