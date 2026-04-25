const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    clerkId: { type: String },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    authType: {
        type: String,
        enum: ['local', 'google', 'github'],
        default: 'local'
    }
}, { timestamps: true });

const User = mongoose.model("user", Schema)
module.exports = { User, }