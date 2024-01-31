const user = require('../database configuration/dbSchema');
const bcrypt = require('bcryptjs');
const asyncHandler=require('express-async-handler')

const  register = asyncHandler(async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const email=req.body.email
    console.log('password before hashing',password)
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new user({
        username:username,
        password:hashedPassword,
        email:email
    })
    const userExists = await user.findOne({email:req.body.email});
    if(userExists){
        res.status(400)
        res.json({success:false,message:"user exists"})
    }
    else{
        const savedUser = await newUser.save();
        res.json(savedUser)
    }
})

const login= asyncHandler(async(req,res)=>{
    const password=req.body.password
    const username=req.body.username
    const userInfo =await user.findOne({username:username});
    if(userInfo){
        if(bcrypt.compareSync(password,userInfo.password)){
            res.status(200)
            res.json({
                _id:userInfo._id, 
                username:userInfo.username,
                password:userInfo.password,
            })
        }
        else{
            res.status(401)
            res.json( {message:'Invalid password'})
        }
    }
    else{
        res.status(401)
        res.json({message:'Invalid username'})
    }
})


module.exports = {register,login}