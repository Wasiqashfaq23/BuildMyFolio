const express = require('express')
const router = express.Router()
const { syncClerkUser } = require("../Controller/Clerk")
router.post('/clerk-sync', syncClerkUser)

module.exports = router