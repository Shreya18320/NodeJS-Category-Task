const express = require("express");
const router = express.Router();

const subcategoryController = require("../controllers/subcategory");

router.get("/", subcategoryController.getSubCategories);
// router.get("/search", subcategoryController.searchSubcategory);
router.get("/:category_id", subcategoryController.getSubCategories);
router.post("/", subcategoryController.addSubcategory);
router.put("/:id", subcategoryController.updateSubcategory);
router.delete("/:id", subcategoryController.deleteSubcategory);


module.exports = router;
