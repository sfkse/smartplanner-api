const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  getLoggedInUser,
  setUserRegistered,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/setUserRegistered", setUserRegistered);
router.get("/authuser", getLoggedInUser);

module.exports = router;

