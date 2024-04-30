const AppError = require("../helpers/errorHelper");
const {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} = require("../models/classModel");

const getAllClasses = async (req, res, next) => {
  try {
    const { idcustomers } = res.locals.user;

    const classes = await getClasses(idcustomers, next);
    return res.status(200).json(classes);
  } catch (error) {
    return next(new AppError(`Error in getAllClasses: ${error}`));
  }
};

const createNewClass = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  const { name } = req.body;

  try {
    await createClass(idcustomers, name, next);
    return res.status(201).json("Class created successfully");
  } catch (error) {
    return next(new AppError(`Error when creating a new class: ${error}`));
  }
};

const updateClassName = async (req, res, next) => {
  const { idcustomers } = res.locals.user;

  try {
    await updateClass(idcustomers, req.body, next);
    return res.status(200).json("Class updated successfully");
  } catch (error) {
    return next(new AppError(`Error when updating class: ${error}`));
  }
};

const removeClass = async (req, res, next) => {
  const { idClasses } = req.body;

  try {
    await deleteClass(idClasses, next);
    return res.status(200).json("Class removed successfully");
  } catch (error) {
    return next(new AppError(`Error when removing class: ${error}`));
  }
};

module.exports = {
  getAllClasses,
  createNewClass,
  updateClassName,
  removeClass,
};

