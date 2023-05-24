const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes.controller");

router.get("/", notesController.getAll);

router.get("/:idnotes", notesController.getNote);

module.exports = router;

