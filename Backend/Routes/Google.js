const express = require("express");
const router = express.Router();
const { handleGoogleAuth } = require("../Controller/Google");

router.post("/google", handleGoogleAuth);

module.exports = router;
