const response = require("../common/response");
const Category = require("../models/categorymodel");

// ✅ import validators
const {
  validateCreateCategory,
  validateUpdateCategory
} = require("../validators/categoryvalidation");

// ================= GET =================
exports.getCategories = async (req, res) => {
  try {
    const result = await Category.findAll();
    return response.sendSuccess(res, "Categories fetched successfully", result);
  } catch (err) {
    return response.sendError(res, "Failed to fetch categories", 500);
  }
};

// ================= POST =================
exports.addCategory = async (req, res) => {
  try {
    // ✅ VALIDATION (common file se)
    const error = validateCreateCategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const name = req.body.name;

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const category = await Category.create({
      name: name,
      image: image
    });

    return response.sendSuccess(res, "Category added successfully", {
      imageUrl: image,
      data: category
    });
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to add category", 500);
  }
};

// ================= UPDATE =================
exports.updateCategory = async (req, res) => {
  try {
    // ✅ VALIDATION (common file se)
    const error = validateUpdateCategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const id = req.params.id;
    const name = req.body.name;

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const updated = await Category.update(
      { name: name, image: image },
      { where: { id: id } }
    );

    if (updated[0] === 0) {
      return response.sendError(res, "Category not found", 404);
    }

    return response.sendSuccess(res, "Category updated successfully", {
      imageUrl: image
    });
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to update category", 500);
  }
};

// ================= DELETE =================
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return response.sendError(res, "ID is required", 400);
    }

    const deleted = await Category.destroy({
      where: { id: id }
    });

    if (!deleted) {
      return response.sendError(res, "Category not found", 404);
    }

    return response.sendSuccess(res, "Category deleted successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to delete category", 500);
  }
};
