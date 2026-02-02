const Joi = require("joi");
const response = require("../common/response");

// create
exports.createCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    
      name: Joi.string()
  .trim()
  .min(2)
  .max(100)
  .pattern(/^(?!\s*$)[a-zA-Z\s&-]+$/)
  .required()
  .messages({
        "string.pattern.base": "Name can contain only letters, spaces, & and -",
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 100 characters",
        "any.required": "Name is required"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }

  next();
};

// update
exports.updateCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .pattern(/^(?!\s*$)[a-zA-Z0-9\s&-]+$/)
      .optional()
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
