const express = require("express");
const router = express.Router();
const {
  getUsers,
  getSingleUser,
  updateSingleUserLocation,
  updateSingleUser,
} = require("../controllers/userController");
const { verifyJWTMiddleware } = require("../middlewares/authMiddleware");

router.get("/all", getUsers);
router.get("/single/:id", verifyJWTMiddleware, getSingleUser);
router.put("/single/:id", verifyJWTMiddleware, updateSingleUser);
router.put(
  "/single/:id/location",
  verifyJWTMiddleware,
  updateSingleUserLocation
);

module.exports = router;

