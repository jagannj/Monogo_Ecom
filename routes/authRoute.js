const express = require("express");
const {createUser,UserLogin,getallUser,getaUser,UpdateaUser,deleteaUser}= require("../controllers/userController")
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware")
const authRouter = express.Router()
authRouter.post("/register",createUser)
authRouter.post("/login",UserLogin)
authRouter.get("/all-user",authMiddleware,isAdmin,getallUser)
authRouter.get("/get",authMiddleware,getaUser)
authRouter.put("/edit-user",authMiddleware,UpdateaUser)
authRouter.delete("/:id",deleteaUser)
authRouter.put("/edit-user",authMiddleware,UpdateaUser)
authRouter.put("/edit-user",authMiddleware,UpdateaUser)
module.exports= {authRouter};