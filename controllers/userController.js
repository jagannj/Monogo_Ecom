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
        token:genToken(findUser?._id)
    })
  }
  else{
    throw new Error(`Invalid Credentials`)
  }

})

//Get all users

exports.getallUser =asynchandler(async(req,res)=>{
  try {
    const getUser =await User.find();
    res.json(getUser)
  } catch (error) {
    throw new Error(error)
  }
})

exports.getaUser =asynchandler(async(req,res)=>{
  try {
    // res.json()
    const{id}= req.params;
    const getUserbyId =await User.findById(id);
    res.json(getUserbyId)

  } catch (error) {
    throw new Error(error)
  }
})

exports.deleteaUser =asynchandler(async(req,res)=>{
  try {
    // res.json()
    const{id}= req.params;
    const deleteUserbyId =await User.findByIdAndDelete(id);
    res.json(deleteUserbyId)

  } catch (error) {
    throw new Error(error)
  }
})


exports.UpdateaUser =asynchandler(async(req,res)=>{
  const {firstname,lastname,mobile,email} = req.body;
  try {
    // res.json()
    const{id}= req.params;
    const updateUser =await User.findByIdAndUpdate(id,{firstname,lastname,mobile,email},
      {new : true},);
    res.json(updateUser)

  } catch (error) {
    throw new Error(error)
  }
})

