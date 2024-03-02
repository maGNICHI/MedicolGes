const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
//configure et initialise le serveur Express, en utilisant le middleware 
//express.json() pour traiter les requêtes au format JSON
dotenv.config();
connectDB(); 
const app = express();

app.use(express.json()); 

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
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

    });
  });
  socket.off("setup", () => {
    socket.leave(userData._id);
  });

});  

