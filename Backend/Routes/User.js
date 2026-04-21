const express = require("express")
const router = express.Router()
const { handleSignup, handleLogin, handleLogout, handleMe } = require("../Controller/User")
const verifyToken = require("../Middleware/Auth")

router.post("/signup", handleSignup)
router.post("/login", handleLogin)
router.post("/logout",handleLogout)
router.get("/me",verifyToken,handleMe)

module.exports = router