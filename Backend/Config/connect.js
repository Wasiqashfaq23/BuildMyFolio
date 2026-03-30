const mongoose=require("mongoose")

async function ConnectToDatabase(){
    mongoose.connect("mongodb://localhost:27017/")
} 
module.exports ={ConnectToDatabase}