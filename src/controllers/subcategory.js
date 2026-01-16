const response = require("../common/response");
const Subcategory = require("../models/subcategorymodel");
const Item = require("../models/itemsmodel");

// ✅ import validators
const {
  validateCreateSubcategory,
  validateUpdateSubcategory
} = require("../validators/subcategoryvalidation");

// ================= GET =================
exports.getSubCategories = async (req, res) => {
  try {
    const result = await Subcategory.findAll();
    return response.sendSuccess(res, "Subcategories fetched successfully", result);
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to fetch subcategories", 500);
  }
};

// ================= PAGINATION =================
exports.getSubCategoriesWithpagination = async (req, res) => {
  try {
    const categoryId = req.params.category_id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    if (!categoryId) {
      return response.sendError(res, "Category ID is required", 400);
    }

    const { count, rows } = await Subcategory.findAndCountAll({
      where: { category_id: categoryId },
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(count / limit);

    return response.sendSuccess(res, "Subcategories fetched successfully", {
      pagination: {
        totalRecords: count,
        totalPages: totalPages,
        currentPage: page,
        limit: limit
      },
      data: rows
    });
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to fetch subcategories", 500);
  }
};

// ================= POST =================
exports.addSubcategory = async (req, res) => {
  try {
    // ✅ VALIDATION
    const error = validateCreateSubcategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const { name, category_id } = req.body;

    const subcategory = await Subcategory.create({
      name: name,
      category_id: category_id
    });

    return response.sendSuccess(res, "Subcategory added successfully", subcategory);
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to add subcategory", 500);
  }
};

// ================= UPDATE =================
exports.updateSubcategory = async (req, res) => {
  try {
    // ✅ VALIDATION
    const error = validateUpdateSubcategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const { name, category_id } = req.body;
    const id = req.params.id;

    const updated = await Subcategory.update(
      { name: name, category_id: category_id },
      { where: { id: id } }
    );

    if (updated[0] === 0) {
      return response.sendError(res, "Subcategory not found", 404);
    }

    return response.sendSuccess(res, "Subcategory updated successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to update subcategory", 500);
  }
};

// ================= DELETE =================
exports.deleteSubcategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return response.sendError(res, "Subcategory ID is required", 400);
    }

    const deleted = await Subcategory.destroy({
      where: { id: id }
    });

    if (!deleted) {
      return response.sendError(res, "Subcategory not found", 404);
    }

    return response.sendSuccess(res, "Subcategory deleted successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to delete subcategory", 500);
  }
};

// ================= SEARCH =================
exports.searchSubcategory = async (req, res) => {
  try {
    const search = req.query.search || "";

    if (!search || search.trim() === "") {
      return response.sendError(res, "Search text is required", 400);
    }

    const result = await Subcategory.findAll({
      where: {
        name: {
          [require("sequelize").Op.like]: `%${search}%`
        }
      },
      include: [
        {
          model: Item,
          required: true
        }
      ]
    });

    return response.sendSuccess(res, "Search result fetched successfully", result);
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Search failed", 500);
  }
};
