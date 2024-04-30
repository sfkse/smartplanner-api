const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/create", customerController.createNewCustomer);

module.exports = router;

