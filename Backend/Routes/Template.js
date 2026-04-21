const express = require("express");
const router = express.Router();
const { getAllTemplates, getTemplateById, createTemplate, deleteTemplate, updateTemplate } = require("../Controller/Template");
const upload = require("../Middleware/Upload");
const adminOnly = require("../Middleware/Admin");
const verifyToken = require("../Middleware/Auth");

router.post("/", verifyToken, adminOnly, (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, createTemplate);

router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
router.delete("/:id", deleteTemplate);
router.put("/:id", updateTemplate);

module.exports = router;