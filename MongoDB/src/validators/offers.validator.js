const Joi = require("joi");
const response = require("../common/response");

// CREATE
exports.createOfferValidation = (req, res, next) => {
   const offerSchema = Joi.object({
    subcategory_id: Joi.string().hex().length(24).required(),
    title: Joi.string().trim().min(3).max(100).required(),
    discount_type: Joi.string().valid("percentage", "flat").required(),
    discount_value: Joi.number().min(1).required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().greater(Joi.ref("start_date")).required(),
  });

  // allow object OR array
  const schema = Joi.alternatives().try(
    offerSchema,
    Joi.array().items(offerSchema).min(1)
  );

  const { error } = schema.validate(req.body);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }

  next();
};

// UPDATE
exports.updateOfferValidation = (req, res, next) => {
  const schema = Joi.object({
    subcategory_id: Joi.string().hex().length(24).optional(),
    title: Joi.string().trim().min(3).max(100).optional(),
    discount_type: Joi.string().valid("percentage", "flat").optional(),
    discount_value: Joi.number().min(1).optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }
  next();
};

// LIST (pagination + search + sort)
exports.offerListValidation = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),

    search: Joi.string().trim().optional(), // title search
    subcategory_id: Joi.string().hex().length(24).optional(),

    sort: Joi.string().valid("start_date", "end_date", "createdAt").optional(),
    order: Joi.string().valid("asc", "desc").optional(),
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }
  next();
};

// ID
exports.validateObjectId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return response.error(res, 400, "Invalid ID");
  }
  next();
};
