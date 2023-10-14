const express = require("express");
const router = express.Router();
const {
  getUsers,
  getSingleUser,
  updateSingleUser,
  updateSingleUserLocation,
} = require("../controllers/userController");

/**
 ** @desc User routes
 */
router.get("/all", getUsers);
router.get("/single/:id", getSingleUser);
router.put("/single/:id", updateSingleUser);
router.put("/single/:id/location", updateSingleUserLocation);

module.exports = router;

