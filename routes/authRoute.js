const express = require("express");
const {createUser,UserLogin}= require("../controllers/userController")
const authRouter = express.Router()
authRouter.post("/register",createUser)
authRouter.post("/login",UserLogin)
module.exports= {authRouter};