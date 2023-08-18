const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", authMiddleware.authenticateToken, authController.login);
router.post("/register", authController.register);

module.exports = router;

