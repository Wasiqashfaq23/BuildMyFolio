const express = require("express")
const router = express.Router()
const { getPortfolio, createPortfolio, deletePortfolio, updatePortfolio, getAllPortfolios ,getPortfolioById} = require("../Controller/Portfolio")
const verifyToken = require("../Middleware/Auth")
router.get("/all", verifyToken, getAllPortfolios);
router.get("/id/:id", verifyToken, getPortfolioById);
router.post("/", verifyToken, createPortfolio);
router.put("/:id", verifyToken, updatePortfolio);
router.delete("/:id", verifyToken, deletePortfolio);
router.get("/:slug", getPortfolio);


module.exports = router