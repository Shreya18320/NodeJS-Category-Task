const response = require("../common/response");
const Category = require("../models/categorymodel");
const Subcategory = require("../models/subcategorymodel");
const Item = require("../models/itemsmodel");
const Offer = require("../models/offermodel");


const {
  validateCreateCategory,
  validateUpdateCategory,
  validateDeleteCategory
} = require("../validators/categoryvalidation");

// GET ALL

exports.getCategories = async (req, res) => {
  try {
    const result = await Category.findAll({
      attributes: ["id", "name", "image"],
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          required: false,
          separate: true,
          attributes: ["id", "name"],
          include: [
            {
              model: Item,
              as: "items",
              separate: true,
              attributes: ["id", "name", "price", "stock", "rating"]
            },
            {
              model: Offer,
              as: "offers",
              separate: true,
              attributes: [
                "id",
                "title",
                "discount_type",
                "discount_value",
                "start_date",
                "end_date"
              ]
            }
          ]
        }
      ]
    });

    return response.sendSuccess(
      res,
      "Categories fetched successfully with subcategories, items and offers",
      result
    );
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to fetch categories", 500);
  }
};


// CREATE
exports.addCategory = async (req, res) => {
  try {
    const error = validateCreateCategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const name = req.body.name;

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const category = await Category.create({
      name,
      image
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

// UPDATE
exports.updateCategory = async (req, res) => {
  try {
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
      { name, image },
      { where: { id } }
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

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const error = validateDeleteCategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const id = req.params.id;

    const deleted = await Category.destroy({
      where: { id }
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
