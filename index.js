const express = require("express");
const dotenv = require("dotenv").config();
const dBconnected = require("./config/dbConnect")
const authRouters = require("./routes/authRoute")
const {notFound,errorHandler} = require("./middlewares/errorHandler")
const PORT = process.env.PORT||4000;
dBconnected.dBconnect()
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//error handler Middleware
app.use('/api/user',authRouters.authRouter)

app.use(notFound)
app.use(errorHandler)
app.listen(PORT,(err)=>{
    console.log(`Server Running on ${PORT}`);
})