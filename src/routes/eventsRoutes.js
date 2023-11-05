const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.get("/all", eventsController.getAllEvents);
router.post("/single/:id/join", eventsController.joinSingleEvent);
router.get("/single/:id/participants", eventsController.getEventParticipants);
router.get("/single/:id", eventsController.getSingleEvent);
router.get("/:id/all", eventsController.getAllEvents);
router.get("/user/:id", eventsController.getUserEvents);
router.post("/create", eventsController.createEvents);

module.exports = router;

