const { v4: uuidv4 } = require('uuid');
const Portfolio = require("../Model/Portfolio");

function generateSlug(fullName) {
  if (!fullName) throw new Error("No full name provided");
  const baseSlug = fullName.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30);;
  return `${baseSlug}-${uuidv4().slice(0, 8)}`;
}

async function getPortfolio(req, res) {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ message: "No slug provided" });
    }
    const portfolio = await Portfolio.findOne({ slug }).populate("templateId");
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    return res.status(200).json(portfolio);
  } catch (err) {
    console.error("getPortfolio error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getPortfolioById(req, res) {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id).populate("templateId");
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    return res.status(200).json(portfolio);
  } catch (err) {
    console.error("getPortfolioById error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createPortfolio(req, res) {
  try {
    const { userData, templateId } = req.body;
    if (!templateId || !userData) {
      return res.status(400).json({ message: "userData and templateId are required" });
    }
    const userId = req.user._id;
    const isPresent = await Portfolio.findOne({ userId, templateId });
    if (isPresent) {
      return res.status(409).json({ message: "Portfolio with same template already exists" });
    }
    const slug = generateSlug(userData?.hero?.fullName || "portfolio");
    const portfolio = await Portfolio.create({ userId, userData, templateId, slug });
    return res.status(201).json({ message: "Portfolio created", slug, portfolio });
  } catch (err) {
    console.error("createPortfolio error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updatePortfolio(req, res) {
  try {
    const { id } = req.params;
    const { userData } = req.body;
    if (!id) {
      return res.status(400).json({ message: "No id provided" });
    }
    if (!userData) {
      return res.status(400).json({ message: "No data to update" });
    }
    const portfolio = await Portfolio.findByIdAndUpdate(
      id,
      { userData },
      { new: true }
    );
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    return res.status(200).json({ message: "Portfolio updated", portfolio });
  } catch (err) {
    console.error("updatePortfolio error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deletePortfolio(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No id provided" });
    }
    const portfolio = await Portfolio.findByIdAndDelete(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    return res.status(200).json({ message: "Portfolio deleted" });
  } catch (err) {
    console.error("deletePortfolio error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllPortfolios(req, res) {
  try {
    const userId = req.user._id;
    const portfolios = await Portfolio.find({ userId });
    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({ message: "No portfolios found" });
    }
    return res.status(200).json(portfolios);
  } catch (err) {
    console.error("getAllPortfolios error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createPortfolio, getPortfolio, updatePortfolio, deletePortfolio, getAllPortfolios,getPortfolioById };