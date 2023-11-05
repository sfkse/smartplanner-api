const AppError = require("../helpers/errorHelper");
const {
  getAllNotesByUserId,
  createNote,
  updateNote,
  deleteNote,
} = require("../models/noteModel");
const getAllUserNotes = async (req, res, next) => {
  const { iduser } = req.params;
  try {
    const notes = await getAllNotesByUserId(iduser, next);
    return res.status(200).json(notes);
  } catch (error) {
    return next(
      new AppError(`Error when fetching notes for user ${iduser}: ${error}`)
    );
  }
};

const createUserNote = async (req, res, next) => {
  const data = req.body;
  try {
    const notes = await createNote(data, next);
    return res.status(201).json(notes);
  } catch (error) {
    return next(new AppError(`Error when creating note for user: ${error}`));
  }
};

const saveUserNote = async (req, res, next) => {
  const { iduser } = req.params;
  const data = req.body;
  try {
    const notes = await updateNote(data, iduser, next);

    return res.status(200).json(notes);
  } catch (error) {
    return next(new AppError(`Error when saving note for user: ${error}`));
  }
};

const deleteUserNote = async (req, res, next) => {
  const { idnotes } = req.params;
  try {
    const result = await deleteNote(idnotes, next);
    return res.status(200).json(result);
  } catch (error) {
    return next(new AppError(`Error when deleting note ${idnotes}`));
  }
};
module.exports = {
  getAllUserNotes,
  createUserNote,
  saveUserNote,
  deleteUserNote,
};

