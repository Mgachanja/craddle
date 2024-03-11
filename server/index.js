const express =require('express');
const PORT = process.env.PORT ||6000;
const cors= require('cors')
const dotenv = require('dotenv').config();
const app = express();
const http = require('http')
const server = http.createServer(app);
const io=require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,

    }
});
const connectDB = require('./database configuration/databaseConnection');
const router=require('./routes/signup.js'); 
const messages = require("./routes/messages.js")

//connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
server.listen(4000, ()=>{console.log(`Server is running on port ${PORT}`)})