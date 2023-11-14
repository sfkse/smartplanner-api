const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const pool = require("../configs/db.config");
const AppError = require("../helpers/errorHelper");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getAllUsers = async (next) => {
  try {
    const result = await pool.query(
      "SELECT firstname, lastname, location, skills FROM users"
    );
    const response = result[0].map((user) => ({
      ...user,
      skills: JSON.parse(user.skills),
    }));
    return response;
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (userID, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE idusers = ? and active",
      [userID]
    );

    const response = result[0].map((user) => ({
      ...user,
      skills: JSON.parse(user.skills),
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

const createUser = async (userData, next) => {
  try {
    const { email, firstName, lastName, skills, password, updated, userType } =
      userData;

    const hashProcessed = await bcrypt.hash(password, 10);
    const hashedPassword = await hashProcessed;
    const userID = uuidv4();
    const created = getTimestampSeconds();

    const result = await pool.execute(
      "INSERT INTO users (idusers, firstname, lastname, email, password, created, updated, usertype, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userID,
        firstName,
        lastName,
        email,
        hashedPassword,
        created,
        updated,
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

const updateUserLocation = async (userID, data, next) => {
  const stringifiedData = JSON.stringify(data);

  try {
    const result = await pool.execute(
      "UPDATE code_buddy.users SET location=? WHERE idusers = ?",
      [stringifiedData, userID]
    );

    if (result[0].affectedRows) return true;
    return false;
  } catch (error) {
    return next(error);
  }
};

const setRegistered = async (userID, next) => {
  const updated = getTimestampSeconds();
  try {
    const result = await pool.execute(
      "UPDATE users SET registered=?, updated=? WHERE idusers = ?",
      [1, updated, userID]
    );

    if (result[0].affectedRows) return true;
    return false;
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getSingleUserByEmail,
  createUser,
  updateUser,
  updateUserLocation,
  setRegistered,
};

