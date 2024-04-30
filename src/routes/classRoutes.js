const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

router.get("/", classController.getAllClasses);
router.post("/create", classController.createNewClass);
router.put("/update", classController.updateClassName);
router.put("/remove", classController.removeClass);

module.exports = router;

