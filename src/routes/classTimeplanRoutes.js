const express = require("express");
const router = express.Router();
const classTimeplanController = require("../controllers/classTimeplanController");

router.get("/", classTimeplanController.getCustomerClassTimeplans);
router.get("/:id", classTimeplanController.getCustomerSingleClassTimeplans);
router.get("/class/:id", classTimeplanController.getClassTimePlanByClassId);
router.post("/create", classTimeplanController.createNewClassTimeplan);
router.put("/update", classTimeplanController.updateClassTimeplanname);
router.put("/remove", classTimeplanController.deleteClassTimeplan);

module.exports = router;

