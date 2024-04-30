const AppError = require("../helpers/errorHelper");
const {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../models/lessonModel");

const getAllLessons = async (req, res, next) => {
  const { idcustomers } = res.locals.user;

  try {
    const lessons = await getLessons(idcustomers, next);
    return res.status(200).json(lessons);
  } catch (error) {
    return next(
      new AppError(`Error in getAllLessons when fetching events: ${error}`)
    );
  }
};

const createNewLesson = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  const { name } = req.body;

  try {
    await createLesson(idcustomers, name, next);
    return res.status(201).json("Lesson created");
  } catch (error) {
    return next(new AppError(`Error in createNewLesson: ${error}`));
  }
};

const updateLessonName = async (req, res, next) => {
  try {
    await updateLesson(req.body, next);
    return res.status(201).json("Lesson updated");
  } catch (error) {
    return next(new AppError(`Error in updateLesson when updating: ${error}`));
  }
};

const removeLesson = async (req, res, next) => {
  const { idLesson } = req.body;

  try {
    await deleteLesson(idLesson, next);
    return res.status(200).json("Lesson removed");
  } catch (error) {
    return next(new AppError(`Error in removeLesson when removing: ${error}`));
  }
};

module.exports = {
  getAllLessons,
  createNewLesson,
  updateLessonName,
  removeLesson,
};

