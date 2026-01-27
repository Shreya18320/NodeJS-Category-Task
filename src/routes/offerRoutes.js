const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offer");

router.get("/", offerController.getOffers);
router.post("/create", offerController.createOffer);
router.put("/update/:id", offerController.updateOffer);
router.delete("/delete/:id", offerController.deleteOffer);

module.exports = router;
