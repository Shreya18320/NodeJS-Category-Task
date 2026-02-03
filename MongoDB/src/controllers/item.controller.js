const Item = require("../models/item.model");
const response = require("../common/response");

// CREATE
exports.createItem = async (req, res) => {
  try {
    const item = await Item.insertMany(req.body);
    return response.success(res, 201, "Item created successfully", item);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// GET ALL (latest first – because createdAt exists)
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return response.success(res, 200, "Item list", items);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};


// UPDATE
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return response.error(res, 404, "Item not found");
    }

    return response.success(res, 200, "Item updated successfully", item);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// DELETE
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return response.error(res, 404, "Item not found");
    }

    return response.success(res, 200, "Item deleted successfully");
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};
