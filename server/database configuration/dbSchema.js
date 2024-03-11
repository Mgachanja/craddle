const mongoose = require('mongoose');
const userSchema=mongoose.Schema({
    username:{
    type:String,
    required:[true],
    unique:[true,"username already exists"]
    },

    password:{
    type:String,
    required:[true],
    },

    email:{
    type:String,
    required:[true,"you already have an account"],
    unique:true
    }
}) 

module.exports=mongoose.model("user",userSchema)

const todoSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("ToDo", todoSchema);
