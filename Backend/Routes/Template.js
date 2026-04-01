const express = require("express")
const router = express.Router()
const { getAllTemplates, getTemaplateById, createTemplate, deleteTemplate, updateTemplate } = require("../Controller/Template")
router.get("/", getAllTemplates)
router.get("/:id", getTemaplateById)
router.post("/", createTemplate)
router.delete("/:id", deleteTemplate)
router.put("/:id", updateTemplate)

module.exports = router