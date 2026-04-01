const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    templateName: {
        type: String,
        required: true,
        unique:true,
    },
    category: { 
        type: String,
        required:true,
    },
})

const Template=mongoose.model("template",Schema)
module.exports=Template