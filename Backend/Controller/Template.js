const Template = require("../Model/Template.js");
const fs = require("fs");

async function getAllTemplates(req, res) {
  try {
    const templates = await Template.find({ isActive: true });
    if (!templates || templates.length === 0) {
      return res.status(404).json({ message: "No templates found" });
    }
    return res.status(200).json(templates);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getTemplateById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No id given" });
    }
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res.status(200).json(template);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function createTemplate(req, res) {
  try {
    const { templateName, category, description, isActive } = req.body;

    if (!templateName || !category) {
      return res.status(400).json({ message: "templateName and category are required" });
    }

    const isPresent = await Template.findOne({ templateName });
    if (isPresent) {
      return res.status(409).json({ message: "Template with this name already exists" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Preview image is required" });
    }

    const imagePath = req.file.path;
    const portfolioType = templateName.replace(/\s+/g, "");

    const template = await Template.create({
      templateName,
      category,
      image: imagePath,
      portfolioType,
      description: description || "",
      isActive: isActive === "false" ? false : true,
    });

    return res.status(201).json({ message: "Template created", template });
  } catch (err) {
    console.error("createTemplate error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteTemplate(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No id given" });
    }
    const template = await Template.findByIdAndDelete(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res.status(200).json({ message: "Template deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateTemplate(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No id given" });
    }
    const template = await Template.findByIdAndUpdate(id, req.body, { new: true });
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res.status(200).json({ message: "Template updated", template });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getAllTemplates, getTemplateById, createTemplate, deleteTemplate, updateTemplate };