const response = require("../common/response");
const Item = require("../models/itemsmodel");

// ✅ import validators
const {
  validateCreateItem,
  validateUpdateItem
} = require("../validators/itemsvalidation");

// ================= GET + SORT =================
exports.getItems = async (req, res) => {
  try {
    let sortBy = req.query.sortBy || "id";
    let order = req.query.order || "ASC";

    const allowedSort = ["id", "name", "price", "rating", "stock", "created_at"];

    if (!allowedSort.includes(sortBy)) {
      sortBy = "id";
    }

    order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const items = await Item.findAll({
      order: [[sortBy, order]]
    });

    return response.sendSuccess(res, "Items fetched successfully", {
      sortBy,
      order,
      data: items
    });
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to fetch items", 500);
  }
};

// ================= POST =================
exports.addItem = async (req, res) => {
  try {
    // ✅ VALIDATION
    const error = validateCreateItem(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const { subcategory_id, name, price, rating, stock } = req.body;

    const item = await Item.create({
      subcategory_id,
      name: name.trim(),
      price,
      rating: rating || 0,
      stock: stock || 0
    });

    return response.sendSuccess(res, "Item added successfully", item);
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to add item", 500);
  }
};

// ================= UPDATE =================
exports.updateItem = async (req, res) => {
  try {
    // ✅ VALIDATION
    const error = validateUpdateItem(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const id = req.params.id;
    const { subcategory_id, name, price, rating, stock } = req.body;

    const updated = await Item.update(
      {
        subcategory_id,
        name: name.trim(),
        price,
        rating: rating || 0,
        stock: stock || 0
      },
      { where: { id } }
    );

    if (updated[0] === 0) {
      return response.sendError(res, "Item not found", 404);
    }

    return response.sendSuccess(res, "Item updated successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to update item", 500);
  }
};

// ================= DELETE =================
exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return response.sendError(res, "Valid Item ID is required", 400);
    }

    const deleted = await Item.destroy({
      where: { id }
    });

    if (!deleted) {
      return response.sendError(res, "Item not found", 404);
    }

    return response.sendSuccess(res, "Item deleted successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to delete item", 500);
  }
};
