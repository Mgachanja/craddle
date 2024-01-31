const express=require('express')
const router = express.Router();
const {login} = require('../controllers/userControllers')
// @route   POST api/users
router.post("/login",login)




module.exports=router