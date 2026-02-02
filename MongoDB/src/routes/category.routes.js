const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const upload = require("../middleware/upload");
const {
  createCategoryValidation,
  updateCategoryValidation,
  validateObjectId
} = require("../validators/category.validator");


router.get("/all", validateObjectId, categoryController.getCategories);
router.post("/create", upload.single("img"),createCategoryValidation,categoryController.createCategory);
router.put("/update/:id", upload.single("img"),updateCategoryValidation,categoryController.updateCategory);
router.delete("/delete/:id", validateObjectId, categoryController.deleteCategory);

module.exports = router;
