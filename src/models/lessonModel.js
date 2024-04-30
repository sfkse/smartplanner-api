const pool = require("../configs/db.config");
const { v4: uuidv4 } = require("uuid");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getLessons = async (customerID, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM lessons where idcustomers = ? and active = 1 ORDER BY created DESC",
      [customerID]
    );

    return result[0];
  } catch (error) {
    throw next(error);
  }
};

const getSingleLesson = async (lessonID, next) => {
  try {
    const [lesson] = await pool.query(
      "SELECT * FROM lessons WHERE idlessons = ?",
      [lessonID]
    );
    return lesson[0];
  } catch (error) {
    throw next(error);
  }
};

const createLesson = async (customerID, name, next) => {
  const lessonID = uuidv4();
  const active = true;
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    const res = await pool.query(
      "INSERT INTO lessons (idlessons, name, active, created, updated, idcustomers) VALUES (?, ?, ?, ?, ?, ?)",
      [lessonID, name, active, created, updated, customerID]
    );
    console.log(res);
  } catch (error) {
    throw next(error);
  }
};

const updateLesson = async (data, next) => {
  const { idlessons, name } = data;
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "UPDATE lessons SET name = ?, updated = ? WHERE idlessons = ?",
      [name, updated, idlessons]
    );
  } catch (error) {
    throw next(error);
  }
};

const deleteLesson = async (lessonID, next) => {
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "UPDATE lessons SET updated = ?, active = 0 WHERE idlessons = ?",
      [updated, lessonID]
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = {
  getLessons,
  getSingleLesson,
  createLesson,
  updateLesson,
  deleteLesson,
};

