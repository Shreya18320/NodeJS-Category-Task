// src/controllers/subcategory.controller.js
const Subcategory = require("../models/subcategory.model");
const response = require("../common/response");

// create
exports.createSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.create({
      category_id: req.body.category_id,
      name: req.body.name
    });

    return response.success(
      res,
      201,
      "Subcategory created successfully",
      subcategory
    );
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// get
exports.getSubcategories = async (req, res) => {
  try {
    const list = await Subcategory.find();
    return response.success(res, 200, "Subcategory list", list);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// update
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subcategory) {
      return response.error(res, 404, "Subcategory not found");
    }

    return response.success(
      res,
      200,
      "Subcategory updated successfully",
      subcategory
    );
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// delete
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndDelete(id);
    if (!subcategory) {
      return response.error(res, 404, "Subcategory not found");
    }

    return response.success(res, 200, "Subcategory deleted successfully");
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};
