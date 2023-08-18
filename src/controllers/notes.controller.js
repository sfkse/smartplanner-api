const pool = require("../configs/db.config");

function getAll(req, res, next) {
  try {
    // res.json(await programmingLanguages.getMultiple(req.query.page));
    pool.query("SELECT * FROM code_buddy.notes", (err, data) => {
      if (err) return res.json(err);
      // rows fetch
      return res.json(data);
    });
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

function getNote(req, res, next) {
  try {
    const { idnotes } = req.params;
    pool.query(
      "SELECT * FROM code_buddy.notes where idnotes = ?",
      [idnotes],
      (err, data) => {
        if (err) return res.json(err);
        // rows fetch
        return res.json(data);
      }
    );
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

function updateNote(req, res, next) {
  try {
    const { idnotes } = req.params;
    const { body } = req.body;
    const updatedAt = Math.round(Date.now() / 1000);
    pool.query(
      "UPDATE code_buddy.notes SET title=?, content=?, type=?, updatedAt=? where idnotes=?",
      [body.title, body.content, body.type, updatedAt, idnotes],
      (err, data) => {
        if (err) return res.json(err);
        // rows fetch
        return res.json(data);
      }
    );
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

module.exports = {
  getAll,
  getNote,
  updateNote,
};

