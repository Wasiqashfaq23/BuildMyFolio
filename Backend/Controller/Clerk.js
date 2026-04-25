const express = require('express')
const { User } = require('../Model/User')
const generateToken = require('../Utils/Auth')
const router = express.Router()


const syncClerkUser = async (req, res) => {
    try {
        const { clerkId, email, authType } = req.body

        let user = await User.findOne({
            $or: [{ clerkId }, { email }]
        })

        if (!user) {
            user = await User.create({ clerkId, email, authType })
        } else if (!user.clerkId) {
            user.clerkId = clerkId
            user.authType = authType
            await user.save()
        }
const token = generateToken(user)
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' || false,
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000
})
res.json({ 
  user: { 
    id: user._id, 
    email: user.email, 
    isAdmin: user.isAdmin 
  } 
})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = { syncClerkUser }