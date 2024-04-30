const pool = require("../configs/db.config");
const { getTimestampSeconds } = require("../helpers/dateHelper");
const { v4: uuidv4 } = require("uuid");

const createCustomer = async (data, next) => {
  const { name, plan } = data;
  const customerID = uuidv4();
  const active = true;
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "INSERT INTO customers (idcustomers, active, name, plan, created, updated) VALUES (?, ?, ?, ?, ?, ?)",
      [customerID, active, name, plan, created, updated]
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = {
  createCustomer,
};

