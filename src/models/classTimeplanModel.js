const pool = require("../configs/db.config");
const { getTimestampSeconds } = require("../helpers/dateHelper");
const { v4: uuidv4 } = require("uuid");

const getClassTimeplansExpanded = async (customerID, next) => {
  try {
    const [classTimeplans] = await pool.query(
      "SELECT c.idclasses, c.name AS classname, ct.idclasstimeplans, ct.idclasses, ct.timeplanname, ct.minutes FROM classes c JOIN classTimeplans ct ON ct.idclasses = c.idclasses WHERE ct.idcustomers=? and ct.active=1 ORDER BY ct.created DESC",
      [customerID]
    );
    return classTimeplans;
  } catch (error) {
    throw next(error);
  }
};
const createClassTimeplan = async (data, idcustomers, next) => {
  const { timeplanname, idclasses, minutes } = data;

  const classTimeplanID = uuidv4();
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "INSERT INTO classtimeplans (idclasstimeplans, idclasses, timeplanname, minutes, created, updated, idcustomers) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        classTimeplanID,
        idclasses,
        timeplanname,
        JSON.stringify(minutes),
        created,
        updated,
        idcustomers,
      ]
    );
  } catch (error) {
    throw next(error);
  }
};

const updateClassTimeplan = async (data, next) => {
  const { timeplanname, idclasstimeplans, minutes } = data;

  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "UPDATE classtimeplans SET timeplanname = ?, updated = ?, minutes = ? WHERE idclasstimeplans = ?",
      [timeplanname, updated, JSON.stringify(minutes), idclasstimeplans]
    );
  } catch (error) {
    throw next(error);
  }
};

const deleteTimeplan = async (idclasstimeplans, next) => {
  const updated = getTimestampSeconds();
  try {
    await pool.query(
      "UPDATE classtimeplans SET updated = ?, active = 0 WHERE idclasstimeplans = ?",
      [updated, idclasstimeplans]
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = {
  getClassTimeplansExpanded,
  createClassTimeplan,
  updateClassTimeplan,
  deleteTimeplan,
};

