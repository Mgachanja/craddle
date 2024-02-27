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
        methods: ['GET', 'POST']
    }
});;
const connectDB = require('./database configuration/databaseConnection');
const router=require('./routes/signup.js') 

//connectDB()

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
       console.log("server",message)

    })
    socket.broadcast.emit('socket', 'A new user has joined')
}
)

server.listen(4000, () => {
    console.log(`Server listening on 4000`)
})


app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
})