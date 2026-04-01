const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    userData: {
        type: Object,
        required: true,
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "template",
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true })
const Portfolio = mongoose.model("portfolio", Schema)
module.exports = Portfolio