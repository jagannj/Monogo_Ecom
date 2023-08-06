const jwt = require("jsonwebtoken");
exports.genToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})

}
