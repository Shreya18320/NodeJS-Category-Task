// create
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

// update
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

// delete
exports.validateDeleteSubcategory = (req) => {
  const { id } = req.params;

  if (!id) {
    return "Subcategory ID is required";
  }

  return null;
};

// search
exports.validateSearchSubcategory = (req) => {
  const { search } = req.query;

  if (!search || search.trim() === "") {
    return "Search text is required";
  }

  return null;
};

// pagination
exports.validatePaginationSubcategory = (req) => {
  const { page, limit } = req.query;

  if (page && isNaN(page)) {
    return "Page must be a number";
  }

  if (limit && isNaN(limit)) {
    return "Limit must be a number";
  }

  
  return null;
};
