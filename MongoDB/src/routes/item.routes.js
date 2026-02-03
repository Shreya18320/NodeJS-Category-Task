const express = require("express");
const router = express.Router();

const itemController = require("../controllers/item.controller");
const {
  createItemValidation,
  updateItemValidation,
  validateObjectId
} = require("../validators/items.validator");

router.get("/all", itemController.getItems);

router.post("/create",createItemValidation,itemController.createItem);

router.put("/update/:id",validateObjectId,updateItemValidation,itemController.updateItem);

router.delete("/delete/:id",validateObjectId,itemController.deleteItem);

module.exports = router;
