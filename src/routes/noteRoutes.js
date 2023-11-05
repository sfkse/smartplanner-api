const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.get("/:iduser", noteController.getAllUserNotes);
router.put("/:iduser", noteController.saveUserNote);
router.post("/create", noteController.createUserNote);
router.post("/delete/:idnotes", noteController.deleteUserNote);

module.exports = router;

