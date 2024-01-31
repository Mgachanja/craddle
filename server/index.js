const express =require('express');
const PORT = process.env.PORT ||5000;
const cors= require('cors')
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./database configuration/databaseConnection');
const router=require('./routes/signup.js')

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)



app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
})