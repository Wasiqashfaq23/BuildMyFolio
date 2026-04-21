const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const User = mongoose.model("user", Schema)
module.exports = { User, }