exports.validateCreateItem = (req) => {
  const { subcategory_id, name, price, rating, stock } = req.body;

  if (!subcategory_id || isNaN(subcategory_id)) {
    return "Valid Subcategory ID is required";
  }

  if (!name || name.trim() === "") {
    return "Item name is required";
  }

  if (price === undefined || isNaN(price) || Number(price) <= 0) {
    return "Valid price is required";
  }

  if (rating !== undefined && rating !== null) {
    if (isNaN(rating) || Number(rating) < 0 || Number(rating) > 5) {
      return "Rating must be between 0 and 5";
    }
  }

  if (stock !== undefined && stock !== null) {
    if (isNaN(stock) || Number(stock) < 0) {
      return "Stock must be 0 or greater";
    }
  }

  return null;
};

exports.validateUpdateItem = (req) => {
  return exports.validateCreateItem(req);
};


exports.validateDeleteItem = (req) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return "Valid Item ID is required";
  }

  return null;
};