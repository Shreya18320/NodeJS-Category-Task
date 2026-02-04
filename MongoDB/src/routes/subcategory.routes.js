const express = require("express");
const router = express.Router();

const subcategoryController = require("../controllers/subcategory.controller");
const {
  createSubcategoryValidation,
  updateSubcategoryValidation,
  validateObjectId,
  subcategoryListValidation
} = require("../validators/subcategory.validator");

router.get("/all",subcategoryListValidation, subcategoryController.getSubcategories);
router.post("/create",createSubcategoryValidation,subcategoryController.createSubcategory);
router.put("/update/:id",validateObjectId,updateSubcategoryValidation,subcategoryController.updateSubcategory);
router.delete("/delete/:id",validateObjectId,subcategoryController.deleteSubcategory);

module.exports = router;
