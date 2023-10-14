const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const pool = require("../configs/db.config");
const AppError = require("../helpers/errorHelper");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getAllUsers = async (next) => {
  try {
    const result = await pool.query("SELECT * FROM code_buddy.users");
    console.log(result[0]);
    return result[0];
  } catch (error) {
    return next(error);
  }
};

const getUser = async (userID, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM code_buddy.users WHERE idusers = ? and active",
      [userID]
    );
    return result[0];
  } catch (error) {
    return next(error);
  }
};

const getSingleUserByEmail = async (email, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM code_buddy.users WHERE email = ? and active",
      [email]
    );
    return result[0];
  } catch (error) {
    return next(error);
  }
};

const createUser = async (userData, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      skills,
      password,
      updatedAt,
      userType,
    } = userData;

    const hashProcessed = await bcrypt.hash(password, 10);
    const hashedPassword = await hashProcessed;
    const userID = uuidv4();
    const createdAt = getTimestampSeconds();

    const result = await pool.execute(
      "INSERT INTO code_buddy.users (idusers, firstname, lastname, email, password, created_at, updated_at, user_type, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userID,
        firstName,
        lastName,
        email,
        hashedPassword,
        createdAt,
        updatedAt,
        userType,
        skills,
      ]
    );

    if (result[0].affectedRows) return await getSingleUserByEmail(email, next);
    else return next(new AppError("Error when fetching user from db"));
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (userID, data, next) => {
  try {
    const result = await pool.execute(
      "UPDATE code_buddy.users SET coordinates = ? WHERE idusers = ?",
      [data, userID]
    );
  } catch (error) {
    return next(error);
  }
};

const updateUserLocation = async (userID, data, next) => {
  const stringifiedData = JSON.stringify(data);

  try {
    const result = await pool.execute(
      "UPDATE code_buddy.users SET location = ? WHERE idusers = ?",
      [stringifiedData, userID]
    );

    if (result[0].affectedRows) return true;
    return false;
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getSingleUserByEmail,
  createUser,
  updateUser,
  updateUserLocation,
};

