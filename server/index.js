const express =require('express');
const PORT = process.env.PORT ||5000;
const cors= require('cors')
const dotenv = require('dotenv').config();
const app = express();
const createServer=require('node:https').createServer;
const connectDB = require('./database configuration/databaseConnection');
const router=require('./routes/signup.js')
const {Server}=require('socket.io')
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:"localhost:3000"
    }
})
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)



io.on('connection', (socket) => {
    console.log('New connection')
    socket.on('disconnect', () => {
        console.log('User has left')
    })
    socket.on('message', (message) => {
        console.log(message)
    })
    socket.emit('message :',message)
    socket.broadcast.emit('socket', 'A new user has joined')
}

)



httpServer.listen(6000, () => {
    console.log(`Server listening on 6000`)
})


app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
})