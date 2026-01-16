exports.validateCreateSubcategory = (req) => {
  const { name, category_id } = req.body;

  if (!name || name.trim() === "") {
    return "Subcategory name is required";
  }

  if (!category_id) {
    return "Category ID is required";
  }

  return null;
};

exports.validateUpdateSubcategory = (req) => {
  const { name, category_id } = req.body;

  if (!name || name.trim() === "") {
    return "Subcategory name is required";
  }

  if (!category_id) {
    return "Category ID is required";
  }

  return null;
};
