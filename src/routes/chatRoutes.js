const express = require("express");
const router = express.Router();
const { postMessage } = require("../controllers/chatController");

router.post("/", postMessage);

module.exports = router;

