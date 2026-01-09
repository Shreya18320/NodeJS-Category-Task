const response = require("../common/response");
const db = require("../config/db");

// GET
exports.getCategories = (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, result) => {
    if (err) {
      return response.sendError(res, "Failed to fetch categories");
    }

    return response.sendSuccess(res,"Categories fetched successfully", result);
  });
};

// POST

exports.addCategory = (req, res) => {
  const name = req.body.name;
  const image = req.file ? req.file.filename : null;

  if (!name || name.trim() === "") {
    return response.sendError(res, "Name is required", 400);
  }
  if (!image) {
    return response.sendError(res, "Image is required", 400);
  }

  const sql = "INSERT INTO categories (name, image) VALUES (?, ?)";

  db.query(sql, [name, image], (err) => {
    if (err) {
      return response.sendError(res, "Failed to add category");
    }

    return response.sendSuccess(res, "Category added successfully");
  });
};


// UPDATE
exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const image = req.file ? req.file.filename : null;

  // Validation
  if (!id) {
    return response.sendError(res, "ID is required", 400);
  }

  if (!name || name.trim() === "") {
    return response.sendError(res, "Name is required", 400);
  }
  

  const sql = "UPDATE categories SET name = ?, image = ? WHERE id = ?";

  db.query(sql, [name, image, id], (err, result) => {
    if (err) {
      return response.sendError(res, "Failed to update category");
    }

    // If ID not found
    if (result.affectedRows === 0) {
      return response.sendError(res, "Category not found", 404);
    }

    return response.sendSuccess(res, "Category updated successfully");
  });
};


// DELETE
exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  // Validation
  if (!id) {
    return response.sendError(res, "ID is required", 400);
  }

  const sql = "DELETE FROM categories WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return response.sendError(res, "Failed to delete category");
    }

    // If ID not found
    if (result.affectedRows === 0) {
      return response.sendError(res, "Category not found", 404);
    }

    return response.sendSuccess(res, "Category deleted successfully");
  });
};

