const {default:mongoose} = require("mongoose");
exports. dBconnect =()=>{
    try{
        const connecting = mongoose.connect(process.env.MONGODB_URL)
        console.log(`DB Connected`);
    }
    catch(error){
     console.log(`Error the Database`);  
     throw error 

    }
}
