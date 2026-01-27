const Joi = require("joi");


// post category
exports.validateCreateCategory = (req) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .pattern(/^[a-zA-Z0-9\s]+$/)
      .required()
      .messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 100 characters",
        "string.pattern.base": "Name can only contain letters, numbers and spaces",
        "any.required": "Name is required"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return error.details[0].message;

  // file validation
  if (!req.file) {
    return "Image is required";
  }

  return null;
};


// update

exports.validateUpdateCategory = (req) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .pattern(/^[a-zA-Z0-9\s]+$/)
      .required()
      .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 100 characters",
        "string.pattern.base": "Name can only contain letters, numbers and spaces"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return error.details[0].message;

  return null;
};


// delete

exports.validateDeleteCategory = (req) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "Category ID must be a number",
      "any.required": "Category ID is required"
    })
  });

  const { error } = schema.validate(req.params);
  if (error) return error.details[0].message;

  return null;
};
