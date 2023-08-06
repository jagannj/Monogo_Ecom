const express = require("express");
const {createUser,UserLogin,handleRefreshToken,getallUser,getaUser,UpdateaUser,deleteaUser,blockUser,unblockUser}= require("../controllers/userController")
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware")
const authRouter = express.Router()
authRouter.post("/register",createUser)
authRouter.post("/login",UserLogin)
authRouter.get("/all-user",authMiddleware,isAdmin,getallUser)
authRouter.get("/get",authMiddleware,getaUser)
authRouter.put("/edit-user",authMiddleware,UpdateaUser)
authRouter.delete("/:id",deleteaUser)
authRouter.put("/block-user/:id",authMiddleware,isAdmin,blockUser)
authRouter.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser)
authRouter.get("/refreshToken",handleRefreshToken)

module.exports= {authRouter};