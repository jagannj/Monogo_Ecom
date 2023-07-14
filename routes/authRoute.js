const express = require("express");
const {createUser}= require("../controllers/userController")
const authRouter = express.Router()
authRouter.post("/register",createUser)
module.exports= {authRouter};