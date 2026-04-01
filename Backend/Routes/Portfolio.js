const express = require("express")
const router = express.Router()
const { getPortfolio, createPortfolio, deletePortfolio, updatePortfolio, getAllPortfolios } = require("../Controller/Portfolio")
const verifyToken = require("../Middleware/Auth")
router.get("/:slug",getPortfolio)
router.get("/all/:id",verifyToken, getAllPortfolios)
router.post("/", verifyToken,createPortfolio)
router.put("/:slug",verifyToken, updatePortfolio)
router.delete("/:id", verifyToken,deletePortfolio)

module.exports = router