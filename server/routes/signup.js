const express=require('express')
const router = express.Router();
const {register, login} = require('../controllers/userControllers')
// @route   POST api/users
router.post("/signup",register)
router.post("/",login)




module.exports=router