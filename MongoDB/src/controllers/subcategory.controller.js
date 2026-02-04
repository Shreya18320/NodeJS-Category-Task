
const Subcategory = require("../models/subcategory.model");
const response = require("../common/response");


// create
exports.createSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.create({
      category_id: req.body.category_id,
      name: req.body.name
    });

    return response.success(
      res,
      201,
      "Subcategory created successfully",
      subcategory
    );
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// get

exports.getSubcategories = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category_id,
      sort,
      order,
    } = req.query;

    const skip = (page - 1) * limit;

    
    let subcategoryQuery = {};

    if (search) {
      subcategoryQuery.name = { $regex: search, $options: "i" };
    }

    if (category_id) {
      subcategoryQuery.category_id = category_id;
    }

    // sorting
    let sortObj = {};
    if (sort) {
      sortObj[sort] = order === "desc" ? -1 : 1;
    }

    const subcategories = await Subcategory.find(subcategoryQuery)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortObj)
      .populate([
        { path: "items" },
        { path: "offers" },
      ]);

    const total = await Subcategory.countDocuments(subcategoryQuery);

    return response.success(res, 200, "Subcategory with items and offers", {
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
      data: subcategories,
    });

  } catch (error) {
    return response.error(res, 500, error.message);
  }
};


// update
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subcategory) {
      return response.error(res, 404, "Subcategory not found");
    }

    return response.success(
      res,
      200,
      "Subcategory updated successfully",
      subcategory
    );
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};

// delete
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndDelete(id);
    if (!subcategory) {
      return response.error(res, 404, "Subcategory not found");
    }

    return response.success(res, 200, "Subcategory deleted successfully");
  } catch (error) {
    return response.error(res, 500, error.message);
  }
};
