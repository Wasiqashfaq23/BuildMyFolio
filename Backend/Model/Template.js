const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
    templateName: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    portfolioType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });


const Template = mongoose.model("template", templateSchema)
module.exports = Template
