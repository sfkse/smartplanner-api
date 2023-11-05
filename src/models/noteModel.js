const { v4: uuidv4 } = require("uuid");

const pool = require("../configs/db.config");
const AppError = require("../helpers/errorHelper");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getAllNotesByUserId = async (iduser, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM code_buddy.notes WHERE owner=? and active order by updated desc",
      [iduser]
    );
    const response = result[0].map((note) => ({
      ...note,
      tags: JSON.parse(note.tags),
    }));

    return response;
  } catch (error) {
    return next(error);
  }
};

const createNote = async (data, next) => {
  const { title, content, owner, tags } = data;

  const noteID = uuidv4();
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    const result = await pool.query(
      "INSERT INTO code_buddy.notes (idnotes, title, content, tags, created, updated, owner) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [noteID, title, content, JSON.stringify(tags), created, updated, owner]
    );

    if (result[0].affectedRows) return await getAllNotesByUserId(owner, next);
    else
      return next(
        new AppError(
          `Error when fetching notes for user in createNote ${owner}`
        )
      );
  } catch (error) {
    return next(error);
  }
};

const updateNote = async (data, iduser, next) => {
  const { title, content, idnotes, type, tags, active } = data;
  const updated = getTimestampSeconds();

  try {
    const result = await pool.query(
      "UPDATE code_buddy.notes SET title=?, active=?, content=?, updated=?, type=?, tags=?, owner=? WHERE idnotes=?",
      [
        title,
        active,
        content,
        updated,
        type,
        JSON.stringify(tags),
        iduser,
        idnotes,
      ]
    );
    return result[0];
  } catch (error) {
    return next(error);
  }
};

const deleteNote = async (idnotes, next) => {
  try {
    const result = await pool.query(
      "UPDATE code_buddy.notes SET active=false WHERE idnotes=?",
      [idnotes]
    );
    return result[0];
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllNotesByUserId,
  createNote,
  updateNote,
  deleteNote,
};

