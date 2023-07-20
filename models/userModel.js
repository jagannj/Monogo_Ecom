const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        // unique:true,
        index:true,
    },
    lastname:{
        type:String,
        required:true,
        // unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    cart:{
        type:Array,
        default:[],
    },
    address:[
        {
            type:ObjectId,
            ref:"Address"
        },
],
    wishlist:[{type:ObjectId, ref:"Product"}],

},{ timestamps: {} });
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSaltSync(10)
    this.password= await bcrypt.hash(this.password,salt)
})
userSchema.methods.isPasswordMatched = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}
//Export the model
module.exports = mongoose.model('User', userSchema);