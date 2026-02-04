// src/validators/subcategory.validator.js
const Joi = require("joi");
const response = require("../common/response");

// create
exports.createSubcategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    category_id: Joi.string().hex().length(24).required().messages({
      "string.length": "Invalid category id",
      "any.required": "Category id is required"
    }),
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required()
      .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 100 characters"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }

  next();
};

// update
exports.updateSubcategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    category_id: Joi.string().hex().length(24).optional(),
    name: Joi.string().trim().min(2).max(100).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }

  next();
};

//delete
exports.validateObjectId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().hex().length(24).required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return response.error(res, 400, "Invalid ID");
  }

  next();
};

// pagination

// search + sort + pagination (GET all)
exports.subcategoryListValidation = (req, res, next) => {
  const schema = Joi.object({
    // pagination
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),

    // searching
    search: Joi.string().trim().min(1).optional(),
    category_id: Joi.string().hex().length(24).optional(),

    // sorting
    sort: Joi.string().valid("name", "createdAt").optional(),
    order: Joi.string().valid("asc", "desc").optional(),
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }

  next();
};




