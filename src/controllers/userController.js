const AppError = require("../helpers/errorHelper");
const {
  getAllUsers,
  updateUserLocation,
  updateUser,
  createUser,
  getCustomerUsers,
} = require("../models/userModel");
const { getUserById } = require("../models/userModel");

const getUsers = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  try {
    const users = await getAllUsers(idcustomers, next);

    const returnUsers = users.map((user) => {
      delete user.password;
      return user;
    });
    return res.status(200).json(returnUsers);
  } catch (error) {
    return next(new AppError(`Error when fetching users: ${error}`));
  }
};

const getAllCustomerUsers = async (req, res, next) => {
  const { idcustomers: customerID } = res.locals.user;
  try {
    const users = await getCustomerUsers(customerID, next);

    return res.status(200).json(users);
  } catch (error) {
    return next(new AppError(`Error when fetching users: ${error}`));
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body, next);
    return res.status(201).json(user);
  } catch (error) {
    return next(new AppError(`Error when creating user: ${error}`));
  }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const users = await getUserById(id);
    return res.status(200).json(users);
  } catch (error) {
    return next(new AppError(`Error when fetching user: ${error}`));
  }
};

const updateSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await updateUser(id, req.body, next);

    const user = await getUserById(id, next);

    return res.status(200).json(user);
  } catch (error) {
    return next(new AppError(`Error when updating user: ${error}`));
  }
};

const updateSingleUserLocation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const isLocationUpdated = await updateUserLocation(id, req.body, next);
    if (!isLocationUpdated)
      return next(new AppError("Error when updating user location"));
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    return next(new AppError(`Error when updating user location: ${error}`));
  }
};

module.exports = {
  createNewUser,
  getUsers,
  getAllCustomerUsers,
  getSingleUser,
  updateSingleUser,
  updateSingleUserLocation,
};

