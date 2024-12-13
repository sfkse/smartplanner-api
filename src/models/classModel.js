const { v4: uuidv4 } = require("uuid");

const pool = require("../configs/db.config");
// const AppError = require("../helpers/errorHelper");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getClasses = async (customerID, next) => {
  try {
    // Get classes sorted by creation date
    const result = await pool.query(
      "SELECT * FROM classes where idcustomers = ? and active = 1 ORDER BY created DESC",
      [customerID]
    );

    return result[0];
  } catch (error) {
    throw next(error);
  }
};

const createClass = async (customerID, name, next) => {
  const classID = uuidv4();
  const active = true;
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "INSERT INTO classes (idclasses, active, name, created, updated, idcustomers) VALUES (?, ?, ?, ?, ?, ?)",
      [classID, active, name, created, updated, customerID]
    );
  } catch (error) {
    throw next(error);
  }
};

const updateClass = async (customerID, data, next) => {
  const { idclasses, name } = data;
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "UPDATE classes SET name = ?, updated = ? WHERE idclasses = ? AND idcustomers = ?",
      [name, updated, idclasses, customerID]
    );
  } catch (error) {
    throw next(error);
  }
};

const deleteClass = async (classID, next) => {
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "UPDATE classes SET updated = ?, active = 0 WHERE idclasses = ?",
      [updated, classID]
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
};

