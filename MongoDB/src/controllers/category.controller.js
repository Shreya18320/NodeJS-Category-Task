const Category = require("../models/category.model");

exports.createCategory = async (req, res) => {
  try {
    
    const { name } = req.body;

    
    if (!name) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

   
    const category = await Category.create({ name });

    
    res.status(201).json({
      message: "Category created successfully",
      data: category
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
