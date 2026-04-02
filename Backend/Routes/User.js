const express = require("express")
const router = express.Router()
const { handleSignup, handleLogin, handleLogout } = require("../Controller/User")

router.post("/signup", handleSignup)
router.post("/login", handleLogin)
router.post("/logout",handleLogout)

module.exports = router