const pool = require("../configs/db.config");
const { getTimestampSeconds } = require("../helpers/dateHelper");
const { v4: uuidv4 } = require("uuid");

const getTimeplans = async (customerID, next) => {
  try {
    const [timeplans] = await pool.query(
      "SELECT * FROM timeplans where idcustomers=? ORDER BY created DESC",
      [customerID]
    );
    return timeplans;
  } catch (error) {
    throw next(error);
  }
};
const createTimeplan = async (data, next) => {
  const { name, idcustomers } = data;
  const timeplanID = uuidv4();
  const active = true;
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "INSERT INTO timeplans (idtimeplans, active, name, created, updated, idcustomers) VALUES (?, ?, ?, ?, ?, ?)",
      [timeplanID, active, name, created, updated, idcustomers]
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = {
  getTimeplans,
  createTimeplan,
};

