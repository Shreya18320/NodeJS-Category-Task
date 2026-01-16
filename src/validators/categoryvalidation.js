exports.validateCreateCategory = (req) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return "Name is required";
  }

  if (!req.file) {
    return "Image is required";
  }

  return null;
};

exports.validateUpdateCategory = (req) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return "Name is required";
  }

  return null;
};
