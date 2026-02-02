const Joi = require("joi");
const { deleteCategory } = require("../controllers/category");

// create

exports.validateCreateSubcategory = (req) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .required()
      .messages({
        "string.empty": "Subcategory name is required",
        "string.min": "Subcategory name must be at least 2 characters",
        "string.max": "Subcategory name cannot exceed 100 characters",
        "any.required": "Subcategory name is required"
      }),

    category_id: Joi.number()
      .integer()
      .required()
      .messages({
        "number.base": "Category ID must be a number",
        "any.required": "Category ID is required"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return error.details[0].message;

  return null;
};

// update

exports.validateUpdateSubcategory = (req) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .required()
      .messages({
        "string.empty": "Subcategory name is required",
        "string.min": "Subcategory name must be at least 2 characters",
        "string.max": "Subcategory name cannot exceed 100 characters"
      }),

    category_id: Joi.number()
      .integer()
      .required()
      .messages({
        "number.base": "Category ID must be a number",
        "any.required": "Category ID is required"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return error.details[0].message;

  return null;
};

// delete

exports.validateDeleteSubcategory = (req) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "Subcategory ID must be a number",
      "any.required": "Subcategory ID is required"
    })
  });

  const { error } = schema.validate(req.params);
  if (error) return error.details[0].message;

  return null;
};

// search

exports.validateSearchSubcategory = (req) => {
  const schema = Joi.object({
    search: Joi.string().trim().min(1).required().messages({
      "string.empty": "Search text is required",
      "any.required": "Search text is required"
    })
  });

  const { error } = schema.validate(req.query);
  if (error) return error.details[0].message;

  return null;
};

// paggination

exports.validatePaginationSubcategory = (req) => {
 const schema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    search: Joi.string().allow("").optional()   
  });

  return schema.validate(req.query).error?.message;
}