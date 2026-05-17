const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: { type: String },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const User = mongoose.model("user", Schema)
module.exports = { User, }