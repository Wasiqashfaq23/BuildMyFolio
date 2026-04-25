const express = require('express')
const router = express.Router()
const { syncClerkUser, handleClerkWebhook } = require("../Controller/Clerk")
router.post('/webhooks/clerk', handleClerkWebhook)
router.post('/clerk-sync', syncClerkUser)

module.exports = router