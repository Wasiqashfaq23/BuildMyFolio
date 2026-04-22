const express = require("express")
const router = express.Router()
const { getPortfolio, createPortfolio, deletePortfolio, updatePortfolio, getAllPortfolios ,getPortfolioById} = require("../Controller/Portfolio")
const verifyToken = require("../Middleware/Auth")
router.post("/", verifyToken, createPortfolio);
router.get("/all", verifyToken, getAllPortfolios);
router.get("/id/:id", verifyToken, getPortfolioById);
router.put("/:id", verifyToken, updatePortfolio);
router.delete("/:id", verifyToken, deletePortfolio);
router.get("/:slug", getPortfolio);


module.exports = router