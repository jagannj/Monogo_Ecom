// user is Admin or Not
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const asyncHandler= require("express-async-handler");
exports.authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token){
                const decode = jwt.verify(token,process.env.JWT_SECRET);
                const  user = await User.findById(decode?.id);
                req.user = user;
                next();
            }
        } catch (error) {
           throw new Error("Not Authorized token experied") 
        }
    }else{
        throw new Error('There is no token Attached to Header')
    }
})