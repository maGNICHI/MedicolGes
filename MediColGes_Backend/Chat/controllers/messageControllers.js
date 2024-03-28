const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../../UserManagement/Model/User");
const Chat = require("../models/chatModel");
const {Buffer}=require('buffer');
//const { uploads } = require('../../cloudinary');
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

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  // let photoUrl = "";
  // if (req.files['photo']) {
  //   const photoPath = await uploads(req.files['photo'][0].path);
  //   photoUrl = photoPath.url;
  // }
  //schema 
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
    isMedia,
    buffer:b?b:null,
    //photo:photoUrl
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

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/*const   deleteMessages = asyncHandler( async (req, res) => {
  try {
      await Messages.findOneAndDelete({_id: req.params.id, sender: req.user._id,chat: chatId})
      res.json({msg: 'Delete Success!'})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
});*/

module.exports = { allMessages, sendMessage };