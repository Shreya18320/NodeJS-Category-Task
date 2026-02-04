const Category = require("../models/category.model");
const response = require("../common/response");

// create
exports.createCategory = async (req, res) => {
  try {
    if (!req.file) {
      return response.error(res, 400, "Image is required");
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const category = await Category.create({
      name: req.body.name,
      img: imageUrl
    });

    return response.success(res,201,"Category created successfully",category);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// get
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "subcategories",
      populate: [
        { path: "items" },
        { path: "offers" },
      ],
    });
    return response.success(res, 200, "Category list", categories);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// update
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const category = await Category.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return response.error(res, 404, "Category not found");
    }

    return response.success(
      res,
      200,
      "Category updated successfully",
      category
    );
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// delete
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return response.error(res, 404, "Category not found");
    }

    return response.success(res, 200, "Category deleted successfully");
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};
