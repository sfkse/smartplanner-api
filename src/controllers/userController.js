const AppError = require("../helpers/errorHelper");
const { getAllUsers } = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return next(new AppError(`Error when fetching users: ${error}`));
  }
};

module.exports = {
  getUsers,
};

