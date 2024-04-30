const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router.get("/", requestController.getCustomerRequests);
router.post("/create", requestController.createNewRequest);

module.exports = router;

