const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  getLoggedInUser,
} = require("../controllers/authController");
const { verifyJWTMiddleware } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/register", verifyJWTMiddleware, register);
router.post("/logout", logout);
router.get("/authuser", verifyJWTMiddleware, getLoggedInUser);

module.exports = router;

