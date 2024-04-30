const express = require("express");
const router = express.Router();
const yearlyplanController = require("../controllers/yearlyplanController");

router.get("/", yearlyplanController.getCustomerYearlyplans);
router.get("/:id", yearlyplanController.getCustomerSingleYearlyplan);
router.post("/create", yearlyplanController.createNewYearlyplan);
router.put("/update", yearlyplanController.updateCustomerYearlyPlan);
router.put("/remove", yearlyplanController.removeCustomerYearlyPlan);
module.exports = router;

