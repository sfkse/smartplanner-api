const express = require("express");
const router = express.Router();
const discussionsController = require("../controllers/discussionsController");

router.get("/all", discussionsController.getAllDiscussions);
router.get("/:id", discussionsController.getSingleDiscussion);
router.get("/:id/comments", discussionsController.getDiscussionComments);
router.post("/:id/comment", discussionsController.createDiscussionComment);
router.get("/user/:id", discussionsController.getUserDiscussions);
router.post("/create", discussionsController.createDiscussions);
// router.post("/single/:id/join", discussionsController.joinSingleEvent);
// router.get("/single/:id/participants", discussionsController.getEventParticipants);
// router.get("/single/:id", discussionsController.getSingleEvent);
// router.get("/:id/all", discussionsController.getAllEvents);
// router.get("/user/:id", discussionsController.getUserEvents);
// router.get("/user/:id/joined", discussionsController.getJoinedEvents);
// router.post("/create", discussionsController.createEvents);

module.exports = router;

