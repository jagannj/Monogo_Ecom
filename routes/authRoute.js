const express = require("express");
const {createUser,UserLogin,getallUser,getaUser,UpdateaUser,deleteaUser}= require("../controllers/userController")
const authRouter = express.Router()
authRouter.post("/register",createUser)
authRouter.post("/login",UserLogin)
authRouter.get("/all-user",getallUser)
authRouter.get("/:id",getaUser)
authRouter.put("/:id",UpdateaUser)
authRouter.delete("/:id",deleteaUser)

module.exports= {authRouter};