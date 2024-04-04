const express = require('express');

const db = require('./ConfigDB/connection');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const upload = require('./multer')
const cloudinary= require('./cloudinary')
const fs = require ('fs')
// //ajouter 
const OpenAI = require("openai");
/*app.listen(process.env.PORT, () => { 
    console.log('server started on port ' + (process.env.PORT));
});*/

require('dotenv').config(); 
db();
const app = express();
// //ajouter 
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});
app.use(bodyParser.json({ limit: '50mb' }));
// Increase payload size limit for URL encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from localhost:3000
}));
app.use(express.json())
// //ajouter 
const conversationHistory = [
  { role: "system", content: "Vous êtes un assistant utile" }
];

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message; 
  conversationHistory.push({ role: "user", content: userMessage });
  try {
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-3.5-turbo",
    });
    const botResponse = completion.choices[0].message.content; 
    res.json({ message: botResponse });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).send("Error generating response from OpenAI");
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api/chat", require("./Chat/routes/chatRoutes"));
app.use("/api/message", require("./Chat/routes/messageRoutes"));
app.use('/api/project', require('./ProjectManagement/Routes/Project'))
app.use('/api/feedback', require('./ProjectManagement/Routes/Feedback'))
app.use('/form', require('./FormManagement/routes/FormRoutes'));
app.use('/reponse', require('./FormManagement/routes/FormReponse'));
app.use("/api/posts", require("./ForumAndOrganizationManagement/routes/post.routes"));
app.use(
  "/api/organization",
  require("./ForumAndOrganizationManagement/routes/organization.routes")
);

app.use("/api/user", require("./UserManagement/Routes/User"));

//upload images
// app.post('/upload-images', upload.array('image'), async (req, res) => {
    
//     const uploader = async (path) => await cloudinary.uploads(path, 'Images');

//     if (req.method === 'POST') {
//         const urls = [];
//         const files = req.files;
//         for (const file of files) { 
//           const { path } = file;
//           const newPath = await uploader(path);
//           urls.push(newPath);
//           fs.unlinkSync(path);
//         }
//         res.status(200).json({
//             message: 'Images Uploaded Successfully',
//             urls: urls
//         });
//     } else {
//         res.status(405).json({
//             err: "Image not uploaded successfully"
//         });
//     }
// });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));
//Socket.io est conf pour écouter les cnx sur le serveur Express. 
//config spécifie un délai(120 000 ms)et autorise cnx depuis"localhost" en raison de la politique CORS.

const io = require("socket.io")(server, {
  pingTimeout: 120000,
  cors: {
    origin: "http://localhost:3000", 
  },
});
//creer event : on et emit :appele event w yab3thou l serveur
//utilise protocole socket
//evenement
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });
  
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
      //  socket.on("new message", (newMessageReceived) => {
    //   var chat = newMessageReceived.data.chat;

    //   if (!chat.users) return;

    //   chat.users.forEach((user) => {
    //      //Don´t update my own messages array, but the others:
    //      if (user._id === newMessageReceived.data.sender._id) return;

    //      //Send the message back to add it to the messages array:
    //      socket.in(newMessageReceived.room).emit("message received", {newMessageReceived:newMessageReceived.data,chat});
    
    });
  });
  socket.off("setup", () => {
    socket.leave(userData._id);
  });

});  

