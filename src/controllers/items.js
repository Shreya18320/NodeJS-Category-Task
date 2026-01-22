const response = require("../common/response");
const Item = require("../models/itemsmodel");
const { Op } = require("sequelize");

const {
  validateCreateItem,
  validateUpdateItem,
  validateDeleteItem
} = require("../validators/itemsvalidation");

// get + shorting

exports.getItems = async (req, res) => {
  try {
    let { sortBy, order, date } = req.query;

    const allowedSort = ["id", "name", "price", "rating", "stock"];

    sortBy = sortBy || "id";
    order = order || "ASC";

    if (!allowedSort.includes(sortBy)) {
      return response.sendError(
        res,
        `Invalid sort field. Allowed fields are: ${allowedSort.join(", ")}`,
        400
      );
    }

    order = order.toUpperCase();
    if (order !== "ASC" && order !== "DESC") {
      return response.sendError(
        res,
        "Invalid order value. Only ASC or DESC is allowed.",
        400
      );
    }

    // date
    let whereClause = {};

    if (date) {
      let searchDate = "";

      if (date === "today") {
        const today = new Date();
        searchDate = today.toISOString().split("T")[0]; 
      } else {
        searchDate = date; 
      }

      whereClause.created_at = {
        [Op.between]: [
          `${searchDate} 00:00:00`,
          `${searchDate} 23:59:59`
        ]
      };
    }

    const items = await Item.findAll({
      where: whereClause,
      order: [[sortBy, order]]
    });

    return response.sendSuccess(res, "Items fetched successfully", {
      filterDate: date || "all",
      sortBy,
      order,
      data: items
    });

  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to fetch items", 500);
  }
};


// CREATE
exports.addItem = async (req, res) => {
  try {
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

// UPDATE
exports.updateItem = async (req, res) => {
  try {
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

// DELETE
exports.deleteItem = async (req, res) => {
  try {
    const error = validateDeleteItem(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const id = req.params.id;

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
