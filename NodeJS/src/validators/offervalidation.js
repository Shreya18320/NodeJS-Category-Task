const Joi = require("joi");


// post

exports.validateCreateOffer = (req) => {
  const schema = Joi.object({
    subcategory_id: Joi.number().integer().required(),
    title: Joi.string().min(2).required(),
    discount_type: Joi.string().valid("percentage", "flat").required(),
    discount_value: Joi.number().integer().positive().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required()
  });

  const { error } = schema.validate(req.body);
  return error ? error.details[0].message : null;
};


// update

exports.validateUpdateOffer = (req) => {
  const schema = Joi.object({
    subcategory_id: Joi.number().integer().optional(),
    title: Joi.string().min(2).optional(),
    discount_type: Joi.string().valid("percentage", "flat").optional(),
    discount_value: Joi.number().integer().positive().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional()
  });

  const { error } = schema.validate(req.body);
  return error ? error.details[0].message : null;
};


// delete

exports.validateDeleteOffer = (req) => {
  const schema = Joi.object({
    id: Joi.number().integer().required()
  });

  const { error } = schema.validate({ id: req.params.id });
  return error ? error.details[0].message : null;
};
