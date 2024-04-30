const pool = require("../configs/db.config");
const { getTimestampSeconds } = require("../helpers/dateHelper");
const { v4: uuidv4 } = require("uuid");

const getYearlyplans = async (customerID, next) => {
  try {
    const [requests] = await pool.query(
      "SELECT * FROM yearlyplans WHERE idcustomers=? and active ORDER BY created DESC",
      [customerID]
    );

    return requests;
  } catch (error) {
    throw next(error);
  }
};

const createYearlyplan = async (requestData, idcustomers, next) => {
  const { title } = requestData;
  const yearlyplanID = uuidv4();
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "INSERT INTO yearlyplans (idyearlyplans, title, created, updated, idcustomers) VALUES (?, ?, ?, ?, ?)",
      [yearlyplanID, title, created, updated, idcustomers]
    );
  } catch (error) {
    throw next(error);
  }
};

const getSingleYearlyplan = async (customerID, next) => {
  try {
    const [requests] = await pool.query(
      "SELECT * FROM yearlyplans WHERE idcustomers=? and active ORDER BY created DESC",
      [customerID]
    );

    return requests;
  } catch (error) {
    throw next(error);
  }
};

const updateYearlyplan = async (customerID, data, next) => {
  const { idyearlyplans, title } = data;
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "UPDATE yearlyplans SET title = ?, updated = ? WHERE idyearlyplans = ? AND idcustomers = ?",
      [title, updated, idyearlyplans, customerID]
    );
  } catch (error) {
    throw next(error);
  }
};

const deleteYearlyplan = async (planID, next) => {
  const updated = getTimestampSeconds();
  try {
    await pool.query(
      "UPDATE yearlyplans SET updated = ?, active = 0 WHERE idyearlyplans = ?",
      [updated, planID]
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = {
  getYearlyplans,
  createYearlyplan,
  updateYearlyplan,
  deleteYearlyplan,
  getSingleYearlyplan,
};

