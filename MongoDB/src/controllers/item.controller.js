const Item = require("../models/item.model");
const response = require("../common/response");

// CREATE
exports.createItem = async (req, res) => {
  try {
    const item = await Item.insertMany(req.body);
    return response.success(res, 201, "Item created successfully", item);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// GET ALL

exports.getItems = async (req, res) => {
  try {
    const {
      page,
      limit,
      search,
      subcategory_id,
      minPrice,
      maxPrice,
      rating,
      inStock,
      sort,
      order,
    } = req.query;

    const skip = (page - 1) * limit;

    // build query
    let query = {};

    // search by item name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // filter by subcategory
    if (subcategory_id) {
      query.subcategory_id = subcategory_id;
    }

    // price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // stock filter
    if (inStock === "true") {
      query.stock = { $gt: 0 };
    }

    //sorting
    let sortObj = {};
    if (sort) {
      sortObj[sort] = order === "desc" ? -1 : 1;
    }

    //fetch items
    const items = await Item.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortObj);

    const total = await Item.countDocuments(query);

    return response.success(res, 200, "Item list", {
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
      data: items,
      
    });
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};



// UPDATE
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return response.error(res, 404, "Item not found");
    }

    return response.success(res, 200, "Item updated successfully", item);
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// DELETE
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return response.error(res, 404, "Item not found");
    }

    return response.success(res, 200, "Item deleted successfully");
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};
