const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items");

router.get("/", itemsController.getItems);
router.post("/", itemsController.addItem);
router.put("/:id", itemsController.updateItem);
router.delete("/:id", itemsController.deleteItem);

module.exports = router;
