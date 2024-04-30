const express = require("express");
const router = express.Router();
const timeplanController = require("../controllers/timeplanController");

router.get("/", timeplanController.getCustomerTimeplans);
router.post("/create", timeplanController.createNewTimeplan);

module.exports = router;

