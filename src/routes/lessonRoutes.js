const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

router.get("/", lessonController.getAllLessons);
router.post("/create", lessonController.createNewLesson);
router.put("/update", lessonController.updateLessonName);
router.put("/remove", lessonController.removeLesson);

module.exports = router;

