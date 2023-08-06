const User = require("../models/userModel");
const asynchandler = require("express-async-handler")
const {refreshToken} = require("../config/refreshToken")
const { genToken } = require("../config/jwtToken")
const {validateMongodbId} = require("../utils/validate.MongodbId");

exports.createUser = asynchandler(async (req, res) => {

  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // Create new User
    const newUser = await User.create(req.body);
    res.json(newUser);

  }
  else {
    // res.json({message:"user Already Exist"})
    throw new Error('User Already Exist')
  }

})

// user Login Controller

exports.UserLogin = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  // User  if user exists or Not 
  const findUser = await User.findOne({ email: email });
  if (findUser && await findUser.isPasswordMatched(password)) {
    const generateRefreshToken = await refreshToken(findUser?._id)
    const updateUser = await User.findByIdAndUpdate(findUser?.id,{refreshToken:generateRefreshToken},{new:true});
    res.cookie("refreshToken",generateRefreshToken,
    {
      httpOnly:true,
      maxAge:72*60*60*1000
    }
    )
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: genToken(findUser?._id)
    })
  }
  else {
    throw new Error(`Invalid Credentials`)
  }

})
// handle refresh token 
exports.handleRefreshToken = asynchandler(async(req,res)=>{
  const cookie = req.cookies
  console.log(cookie);

})

//Get all users

exports.getallUser = asynchandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser)
  } catch (error) {
    throw new Error(error)
  }
})

exports.getaUser = asynchandler(async (req, res) => {
  try {
    // res.json()
    const { _id } = req.user
    validateMongodbId(_id)
    const getUserbyId = await User.findById(_id);
    res.json(getUserbyId)

  } catch (error) {
    throw new Error(error)
  }
})

exports.deleteaUser = asynchandler(async (req, res) => {
  try {
    // res.json()
    const { id } = req.params;
  validateMongodbId(id)
    const deleteUserbyId = await User.findByIdAndDelete(id);
    res.json(deleteUserbyId)

  } catch (error) {
    throw new Error(error)
  }
})


exports.UpdateaUser = asynchandler(async (req, res) => {

  const { firstname, lastname, mobile, email, role } = req.body;
  try {
    // res.json()
    const { _id } = req.user
    // const{id}= req.params;
    const updateUser = await User.findByIdAndUpdate(_id, { firstname, lastname, mobile, email, role },
      { new: true },);
    res.json(updateUser)

  } catch (error) {
    throw new Error(error)
  }
})

// Blocking Stages

exports.blockUser = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id)
  try {
    const blockUser = await User.findByIdAndUpdate(id, {
      isBlocked: true
    }, { new: true })
    res.send({message:"User is an Blocked!"})
  } catch (error) {
    throw new Error(error)
  }

})

exports.unblockUser = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id)
  try {
    const unblockUser = await User.findByIdAndUpdate(id, {
      isBlocked: false
    }, { new: true })
    res.send({message:"User is an un Blocked!"})
  } catch (error) {
    throw new Error(error)
  }
})
