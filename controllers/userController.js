const User = require("../models/userModel");
const asynchandler = require("express-async-handler")
const {genToken} = require("../config/jwtToken")
exports.createUser = asynchandler(async(req,res)=>{

    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        // Create new User
        const newUser =await User.create(req.body);
        res.json(newUser);

    }
    else{
        // res.json({message:"user Already Exist"})
        throw new Error ('User Already Exist')
    }

})

// user Login Controller

exports.UserLogin = asynchandler(async(req,res)=>{
  const {email, password}= req.body; 
  // User  if user exists or Not 
  const findUser = await User.findOne({email:email});
  if(findUser && await findUser.isPasswordMatched(password)){
    res.json({
        _id:findUser?._id,
        firstname:findUser?.firstname,
        lastname:findUser?.lastname,
        email: findUser?.email,
        mobile:findUser?.mobile,
        createdat:findUser?.createdat,
        token:genToken(findUser?._id,)
    })
  }
  else{
    throw new Error(`Invalid User : ${email}`)
  }

})

