const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");

/**
 ** @desc User routes
 */
router.get("/all", getUsers);

module.exports = router;

