const Joi = require("joi");

// create

exports.validateCreateItem = (req) => {
  const schema = Joi.object({
    subcategory_id: Joi.number()
      .integer()
      .required()
      .messages({
        "number.base": "Subcategory ID must be a number",
        "any.required": "Subcategory ID is required"
      }),

    name: Joi.string()
      .min(2)
      .max(200)
      .trim()
      .required()
      .messages({
        "string.empty": "Item name is required",
        "string.min": "Item name must be at least 2 characters",
        "string.max": "Item name cannot exceed 200 characters",
        "any.required": "Item name is required"
      }),

    price: Joi.number()
      .positive()
      .required()
      .messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be greater than 0",
        "any.required": "Price is required"
      }),

    rating: Joi.number()
      .min(0)
      .max(5)
      .optional()
      .messages({
        "number.base": "Rating must be a number",
        "number.min": "Rating must be between 0 and 5",
        "number.max": "Rating must be between 0 and 5"
      }),

    stock: Joi.number()
      .integer()
      .min(0)
      .optional()
      .messages({
        "number.base": "Stock must be a number",
        "number.min": "Stock must be 0 or greater"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return error.details[0].message;

  return null;
};

// update

exports.validateUpdateItem = (req) => {
  const schema = Joi.object({
    subcategory_id: Joi.number()
      .integer()
      .required()
      .messages({
        "number.base": "Subcategory ID must be a number",
        "any.required": "Subcategory ID is required"
      }),

    name: Joi.string()
      .min(2)
      .max(200)
      .trim()
      .required()
      .messages({
        "string.empty": "Item name is required",
        "string.min": "Item name must be at least 2 characters",
        "string.max": "Item name cannot exceed 200 characters"
      }),

    price: Joi.number()
      .positive()
      .required()
      .messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be greater than 0",
        "any.required": "Price is required"
      }),

    rating: Joi.number()
      .min(0)
      .max(5)
      .optional()
      .messages({
        "number.base": "Rating must be a number",
        "number.min": "Rating must be between 0 and 5",
        "number.max": "Rating must be between 0 and 5"
      }),

    stock: Joi.number()
      .integer()
      .min(0)
      .optional()
      .messages({
        "number.base": "Stock must be a number",
        "number.min": "Stock must be 0 or greater"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return error.details[0].message;

  return null;
};

// delete

exports.validateDeleteItem = (req) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "Item ID must be a number",
      "any.required": "Item ID is required"
    })
  });

  const { error } = schema.validate(req.params);
  if (error) return error.details[0].message;

  return null;
};
