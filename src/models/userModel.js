const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const pool = require("../configs/db.config");
const AppError = require("../helpers/errorHelper");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getUserByEmail = async (email, next) => {
  try {
    const result = await pool.query(
      "SELECT idusers, email, password, createdAt, updatedAt, userType FROM code_buddy.users WHERE email = ?",
      [email]
    );
    return result[0];
  } catch (error) {
    return next(new AppError("Error when fetching user from db"));
  }
};

const addUser = async (userData, next) => {
  try {
    const { email, password, updatedAt, userType } = userData;
    const hashProcessed = await bcrypt.hash(password, 10);
    const hashedPassword = await hashProcessed;
    const userID = uuidv4();
    const createdAt = getTimestampSeconds();

    const result = await pool.execute(
      "INSERT INTO code_buddy.users (idusers, email, password, createdAt, updatedAt, userType) VALUES (?, ?, ?, ?, ?, ?)",
      [userID, email, hashedPassword, createdAt, updatedAt, userType]
    );

    if (result[0].affectedRows) return await getUserByEmail(email, next);
    else return next(new AppError("Error when fetching user from db"));
  } catch (error) {
    return next(new AppError(`Error when saving user to db: ${error}`));
  }
};

module.exports = {
  getUserByEmail,
  addUser,
};

