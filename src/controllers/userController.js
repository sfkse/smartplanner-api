const AppError = require("../helpers/errorHelper");
const {
  getAllUsers,
  updateUser,
  updateUserLocation,
} = require("../models/userModel");
const { getUser } = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    const returnUsers = users.map((user) => {
      delete user.password;
      return user;
    });
    return res.status(200).json(returnUsers);
  } catch (error) {
    return next(new AppError(`Error when fetching users: ${error}`));
  }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const users = await getUser(id);
    return res.status(200).json(users);
  } catch (error) {
    return next(new AppError(`Error when fetching user: ${error}`));
  }
};

const updateSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const users = await updateUser(id, req.body);
    return res.status(200).json(users);
  } catch (error) {
    return next(new AppError(`Error when fetching user: ${error}`));
  }
};

const updateSingleUserLocation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const isLocationUpdated = await updateUserLocation(id, req.body, next);
    if (!isLocationUpdated)
      return next(new AppError("Error when updating user location"));
    const user = await getUser(id);
    return res.status(200).json(user);
  } catch (error) {
    return next(new AppError(`Error when updating user location: ${error}`));
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  updateSingleUser,
  updateSingleUserLocation,
};

