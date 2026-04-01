const { v4: uuidv4 } = require('uuid');
const Portfolio = require("../Model/Portfolio")

async function getPortfolio(req, res) {
    if (!req || !req.body) {
        return res.status(400).json("No req or body found")
    }
    const slug = req.params.slug;
    if (!slug) {
        return res.status(404).json("No slug found")
    }
    const userPortfolio = await Portfolio.findOne({ slug })
    if (!userPortfolio) {
        return res.status(404).status("No such portfolio found/Invalid Url")
    }
    return res.status(200).json(userPortfolio)
}

function generateSlug(username) {
    if (!username) {
        res.status(400).json("No username found")
    }
    const baseSlug = username.toLowerCase().replace(/\s+/g, '-')
    const slug = `${baseSlug}-${uuidv4()}`
    console.log(slug)
    return slug
}

async function createPortfolio(req, res) {
    if (!req || !req.body) {
        return res.status(400).json("No req or body found")
    }
    const { userData, templateId } = req.body;
    if (!templateId || !userData) {
        return res.status(400).json("No data found")
    }
    const userId = req.user._id
    const slug = await generateSlug(userData.userName)
    const isPresent = await Portfolio.findOne({ userId, templateId })
    if (isPresent) {
        return res.status(400).json("Portfolio with same details already present")
    }
    const portfolioDetails = {
        userId,
        userData,
        templateId,
        slug
    }
    await Portfolio.create(portfolioDetails)
    return res.status(201).json("Portfolio created", slug)

}
async function updatePortfolio(req, res) {
    const { id } = req.params;
    const { userData } = req.body;

    if (!userData) {
        return res.status(400).json({ error: "No data to update" });
    }
    const portfolio = await Portfolio.findByIdAndUpdate(
        id,
        { userData },
        { new: true },
    );
    if (!portfolio) {
        return res.status(404).json("Portfolio not found");
    }
    return res.status(200).json("Portfolio updated");

}
async function deletePortfolio(req, res) {
    const { id } = req.params;
    console.log(req);
    if (!id) {
        res.status(404).json("No id found")
    }
    const deletedTemplate = await Portfolio.findByIdAndDelete({ _id: id })
    if (!deletedTemplate) {
        return res.status(404).json({ error: "Portfolio not found" });
    }
    return res.status(200).json("Deleted portfolio")
}
async function getAllPortfolios(req, res) {
    const { id } = req.params;
    if (!id) {
        res.status(404).json("No id found")
    }
    const portfolios = await Portfolio.find({ userId: id })
    if (!portfolios) {
        return res.status(404).json({ error: "Portfolios not found" });
    }
    return res.status(200).json(portfolios)
}

module.exports = { createPortfolio, getPortfolio, updatePortfolio, deletePortfolio, getAllPortfolios }