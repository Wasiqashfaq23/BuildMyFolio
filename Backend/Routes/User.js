const express = require("express")
const router = express.Router()
const { handleSignup, handleLogin, handleLogout, handleMe } = require("../Controller/User")

router.post("/signup", handleSignup)
router.post("/login", handleLogin)
router.post("/logout",handleLogout)
router.post("/me",handleMe)

module.exports = router