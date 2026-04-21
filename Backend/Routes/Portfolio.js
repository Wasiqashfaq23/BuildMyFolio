const express = require("express")
const router = express.Router()
const { getPortfolio, createPortfolio, deletePortfolio, updatePortfolio, getAllPortfolios ,getPortfolioById} = require("../Controller/Portfolio")
const verifyToken = require("../Middleware/Auth")
router.get("/all", verifyToken, getAllPortfolios);
router.get("/id/:id", verifyToken, getPortfolioById);

router.post("/", verifyToken, (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, createPortfolio);

router.put("/:id", verifyToken, (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, updatePortfolio);
router.delete("/:id", verifyToken, deletePortfolio);
router.get("/:slug", getPortfolio);


module.exports = router