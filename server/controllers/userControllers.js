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


module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };
  
  module.exports.setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };
  
  module.exports.logOut = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };
  


module.exports = {register,login}