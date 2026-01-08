const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const upload = require("../middleware/multer");


router.get("/", categoryController.getCategories);
router.post("/", upload.single("image"), categoryController.addCategory);
router.put("/:id", upload.single("image"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
