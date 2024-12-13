const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const pool = require("../configs/db.config");
const AppError = require("../helpers/errorHelper");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getAllUsers = async (customerID, next) => {
  try {
    const result = await pool.query(
      "SELECT u.firstname, u.lastname, u.email, u.usertype, l.name as profession FROM users as u join lessons as l on u.profession = l.idlessons WHERE u.idcustomers = ? and u.active = 1 ORDER BY u.created DESC",
      [customerID]
    );

    const response = result[0].map((user) => ({
      ...user,
      password: undefined,
    }));

    return response;
  } catch (error) {
    throw next(error);
  }
};

const getCustomerUsers = async (customerID, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE idcustomers = ?",
      [customerID]
    );

    const response = result[0].map((user) => ({
      ...user,
      password: undefined,
    }));
    return response;
  } catch (error) {
    throw next(error);
  }
};

const createUser = async (userData, next) => {
  try {
    const { email, firstName, lastName, password, profession, customerID } =
      userData;

    // Check if user already exists
    const userExists = await getSingleUserByEmail(email, next);
    if (userExists.length > 0) {
      return next(new AppError("User already exists", 409));
    }

    const hashProcessed = await bcrypt.hash(password, 10);
    const hashedPassword = await hashProcessed;
    const userID = uuidv4();
    const created = getTimestampSeconds();
    const updated = getTimestampSeconds();
    const userType = 0;

    const result = await pool.execute(
      "INSERT INTO users (idusers, firstname, lastname, email, password, created, updated, usertype, profession, idcustomers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userID,
        firstName,
        lastName,
        email,
        hashedPassword,
        created,
        updated,
        userType,
        profession,
        customerID,
      ]
    );

    if (result[0].affectedRows) return await getSingleUserByEmail(email, next);
    else return next(new AppError("Error when fetching user from db"));
  } catch (error) {
    throw next(error);
  }
};

const getUserById = async (userID, next) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE idusers = ? ", [
      userID,
    ]);

    const response = result[0].map((user) => ({
      ...user,
      password: undefined,
    }));

    return response;
  } catch (error) {
    return next(error);
  }
};

const getSingleUserByEmail = async (email, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = ? and active",
      [email]
    );

    return result[0];
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (userID, data, next) => {
  const { firstname, lastname, skills } = data;

  const updated = getTimestampSeconds();
  try {
    const result = await pool.execute(
      "UPDATE users SET firstname=?, lastname=?, skills=?, updated=? WHERE idusers = ?",
      [firstname, lastname, JSON.stringify(skills), updated, userID]
    );

    if (result[0].affectedRows) return true;
    return false;
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  getCustomerUsers,
  getUserById,
  getSingleUserByEmail,
  createUser,
  updateUser,
};

