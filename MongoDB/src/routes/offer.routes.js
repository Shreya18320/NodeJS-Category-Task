const express = require("express");
const router = express.Router();

const offerController = require("../controllers/offer.controller");
const {
  createOfferValidation,
  updateOfferValidation,
  offerListValidation,
  validateObjectId,
} = require("../validators/offers.validator");

router.get("/all", offerListValidation, offerController.getOffers);

router.post("/create", createOfferValidation, offerController.createOffer);

router.put("/update/:id",validateObjectId,updateOfferValidation,offerController.updateOffer);

router.delete("/delete/:id",validateObjectId,offerController.deleteOffer);

module.exports = router;
