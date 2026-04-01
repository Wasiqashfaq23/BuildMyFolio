const mongoose=require("mongoose")
const URL=process.env.MONGO_URI
async function ConnectToDatabase(){
    mongoose.connect(URL)
} 
module.exports ={ConnectToDatabase}