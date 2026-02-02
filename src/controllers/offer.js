const Offer = require("../models/offermodel");
const Subcategory = require("../models/subcategorymodel");
const response = require("../common/response");

const {
  validateCreateOffer,
  validateUpdateOffer,
  validateDeleteOffer
} = require("../validators/offervalidation");


// get all

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll({
      include: [
        {
          model: Subcategory,
          attributes: ["id", "name"]
        }
      ]
    });

    return response.sendSuccess(res, "Offers fetched successfully", offers);
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to fetch offers", 500);
  }
};


//post

exports.createOffer = async (req, res) => {
  try {
    const error = validateCreateOffer(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const offer = await Offer.create(req.body);

    return response.sendSuccess(res, "Offer created successfully", offer);
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Error creating offer", 500);
  }
};

// update
exports.updateOffer = async (req, res) => {
  try {
    const error = validateUpdateOffer(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const id = req.params.id;

    const [updated] = await Offer.update(req.body, {
      where: { id }
    });

    if (updated === 0) {
      return response.sendError(res, "Offer not found", 404);
    }

    return response.sendSuccess(res, "Offer updated successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Error updating offer", 500);
  }
};

// delete
exports.deleteOffer = async (req, res) => {
  try {
    const error = validateDeleteOffer(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const id = req.params.id;

    const deleted = await Offer.destroy({
      where: { id }
    });

    if (!deleted) {
      return response.sendError(res, "Offer not found", 404);
    }

    return response.sendSuccess(res, "Offer deleted successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Error deleting offer", 500);
  }
};
