const Template = require("../Model/Template.js")

async function getAllTemplates(req, res) {
    const templates = await Template.find({})
    if (!templates || templates.length === 0) {
        return res.status(404).json("No templates found")
    }
    return res.status(200).json(templates)
}

async function getTemaplateById(req, res) {
    const { id } = req.params
    if (!id) {
        return res.status(404).status("No Id given")
    }
    const template = await Template.findById(id)
    if (!template) {
        return res.status(404).json("No template with such Id")
    }
    return res.status(200).json(template)
}

async function createTemplate(req, res) {
    if (!req || !req.body) {
        return res.status(400).json("No req or body found")
    }
    const { templateName, category } = req.body;
    if (!templateName || !category) {
        return res.status(400).json("No data found")
    }
    const isPresent = await Template.findOne({ templateName })
    if (isPresent) {
        return res.status(400).json("Template with such name already present")
    }
    const template = {
        templateName,
        category
    }
    await Template.create(template)
    return res.status(201).json("Template created")
}

async function deleteTemplate(req, res) {
    if (!req || !req.body) {
        return res.status(400).json("No req or body found")
    }
    const { id } = req.body
    if (!id) {
        return res.status(404).status("No Id given")
    }
    const template = await Template.findByIdAndDelete({ id })
    if (!template) {
        return res.status(404).json({ error: "Template not found" });
    }
    return res.status(200).json("Template deleted");
}


async function updateTemplate(req,res){
    const {id}=req.params
    if (!id) {
        return res.status(404).status("No Id given")
    }
    const template=await Template.findByIdAndUpdate(id,req.body,{new:true});
    if(!template){
                return res.status(404).json({ error: "Template not found" });
    }
        return res.status(200).json("Template updated");
}

module.exports = { getAllTemplates, getTemaplateById, createTemplate, deleteTemplate ,updateTemplate}