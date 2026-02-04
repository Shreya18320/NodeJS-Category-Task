const Offer = require("../models/offer.model");
const response = require("../common/response");

// CREATE
exports.createOffer = async (req, res) => {
  try {
    const offer = await Offer.insertMany(req.body);
    return response.success(res, 201, "Offer created", offer);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// GET ALL (admin list)
exports.getOffers = async (req, res) => {
  try {
    const {
      page,
      limit,
      search,
      subcategory_id,
      sort,
      order,
    } = req.query;

    const skip = (page - 1) * limit;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (subcategory_id) {
      query.subcategory_id = subcategory_id;
    }

    let sortObj = {};
    if (sort) {
      sortObj[sort] = order === "desc" ? -1 : 1;
    }

    const offers = await Offer.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortObj);

    const total = await Offer.countDocuments(query);

    return response.success(res, 200, "Offer list", {
        pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
      data: offers,
      
    });
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// UPDATE
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!offer) {
      return response.error(res, 404, "Offer not found");
    }

    return response.success(res, 200, "Offer updated", offer);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// DELETE
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);

    if (!offer) {
      return response.error(res, 404, "Offer not found");
    }

    return response.success(res, 200, "Offer deleted");
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};
