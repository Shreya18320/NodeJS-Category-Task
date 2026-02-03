const Joi = require("joi");
const response = require("../common/response");

// create
exports.createItemValidation = (req, res, next) => {
  const schema = Joi.alternatives().try(
    Joi.object({
      subcategory_id: Joi.string().hex().length(24).required(),
      name: Joi.string().trim().min(2).max(100).required(),
      price: Joi.number().min(0).required(),
      rating: Joi.number().min(0).max(5).optional(),
      stock: Joi.number().min(0).required()
    }),
    Joi.array().items(
      Joi.object({
        subcategory_id: Joi.string().hex().length(24).required(),
        name: Joi.string().trim().min(2).max(100).required(),
        price: Joi.number().min(0).required(),
        rating: Joi.number().min(0).max(5).optional(),
        stock: Joi.number().min(0).required()
      })
    )
  );

  const { error } = schema.validate(req.body);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }

  next();
};



// update
exports.updateItemValidation = (req, res, next) => {
  const schema = Joi.object({
    subcategory_id: Joi.string().hex().length(24).optional(),
    name: Joi.string().trim().min(2).max(100).optional(),
    price: Joi.number().min(0).optional(),
    rating: Joi.number().min(0).max(5).optional(),
    stock: Joi.number().min(0).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }

  next();
};

// id validation
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
