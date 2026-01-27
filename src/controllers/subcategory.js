const response = require("../common/response");
const Subcategory = require("../models/subcategorymodel");
const Item = require("../models/itemsmodel");
const Offer = require("../models/offermodel");


const { Op } = require("sequelize");

const {
  validateCreateSubcategory,
  validateUpdateSubcategory,
  validateDeleteSubcategory,
  validateSearchSubcategory,
  validatePaginationSubcategory
} = require("../validators/subcategoryvalidation");

//get and pagination
exports.getSubCategories = async (req, res) => {
  try {
    const error = validatePaginationSubcategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const page = req.query.page;
    const limit = req.query.limit;

    const queryOptions = {
      attributes: ["id", "name"],
      include: [
        {
          model: Item,
          as: "items",
          required: false,
          separate: true,
          attributes: ["id", "name", "price", "stock", "rating"]
        },
        {
          model: Offer,
          as: "offers",
          required: false,
          separate: true,
          attributes: [
            "id",
            "title",
            "discount_type",
            "discount_value",
            "start_date",
            "end_date"
          ]
        }
      ]
    };

    if (page || limit) {
      const pageNumber = parseInt(page) || 1;
      const pageLimit = parseInt(limit) || 5;
      const offset = (pageNumber - 1) * pageLimit;

      const { count, rows } = await Subcategory.findAndCountAll({
        ...queryOptions,
        limit: pageLimit,
        offset
      });

      const totalPages = Math.ceil(count / pageLimit);

      return response.sendSuccess(res, "Subcategories fetched with pagination", {
        pagination: {
          totalRecords: count,
          totalPages,
          currentPage: pageNumber,
          limit: pageLimit
        },
        data: rows
      });
    }

    const rows = await Subcategory.findAll(queryOptions);

    return response.sendSuccess(res, "All subcategories fetched", rows);

  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to fetch subcategories", 500);
  }
};

// post
exports.addSubcategory = async (req, res) => {
  try {
    const error = validateCreateSubcategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const { name, category_id } = req.body;

    const subcategory = await Subcategory.create({
      name,
      category_id
    });

    return response.sendSuccess(res, "Subcategory added successfully", subcategory);
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to add subcategory", 500);
  }
};

// update
exports.updateSubcategory = async (req, res) => {
  try {
    const error = validateUpdateSubcategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const { name, category_id } = req.body;
    const id = req.params.id;

    const updated = await Subcategory.update(
      { name, category_id },
      { where: { id } }
    );

    if (updated[0] === 0) {
      return response.sendError(res, "Subcategory not found", 404);
    }

    return response.sendSuccess(res, "Subcategory updated successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to update subcategory", 500);
  }
};

// delete
exports.deleteSubcategory = async (req, res) => {
  try {
    const error = validateDeleteSubcategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const id = req.params.id;

    const deleted = await Subcategory.destroy({
      where: { id }
    });

    if (!deleted) {
      return response.sendError(res, "Subcategory not found", 404);
    }

    return response.sendSuccess(res, "Subcategory deleted successfully");
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Failed to delete subcategory", 500);
  }
};

// search
exports.searchSubcategory = async (req, res) => {
  try {
    const error = validateSearchSubcategory(req);
    if (error) {
      return response.sendError(res, error, 400);
    }

    const search = req.query.search;

    const result = await Subcategory.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`
        }
      },
      include: [
        {
          model: Item,
          as: "items",
          required: false
        },
        {
          model: Offer,
          as: "offers",
          required: false
        }
      ]
    });

    return response.sendSuccess(res, "Search result fetched successfully", result);
  } catch (err) {
    console.log(err);
    return response.sendError(res, "Search failed", 500);
  }
};
