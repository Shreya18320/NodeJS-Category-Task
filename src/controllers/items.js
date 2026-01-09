const db = require("../config/db");
const response = require("../common/response");

// GET ALL
exports.getItems = (req, res) => {
  const sql = "SELECT * FROM items";

  db.query(sql, (err, result) => {
    if (err) {
      return response.sendError(res, "Failed to fetch items");
    }

    return response.sendSuccess(res, "Items fetched successfully", result);
  });
};




