const User = require("../models/userModel");
const asynchandler = require("express-async-handler")
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