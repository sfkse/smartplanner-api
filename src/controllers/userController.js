const AppError = require("../helpers/errorHelper");
const {
  getAllUsers,
  updateUserLocation,
  updateUser,
} = require("../models/userModel");
const { getUserById } = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers(next);
    // TODO: remove password from response, return skills as array
    // const returnUsers = users.map((user) => {
    //   delete user.password;
    //   user.skills = JSON.parse(user.skills);
    //   console.log(user);
    // });
    // for (let index = 0; index < users.length; index++) {
    //   const user = users[index];
    //   // delete user.password;
    //   user.skills = JSON.parse(user.skills);
    // }
    // console.log("returnUsers", users);
    // if (users.length > 0) {
    //   for (let index = 0; index < users.length; index++) {
    //     const user = users[index];
    //     user.skills = JSON.parse(user.skills);
    //   }
    //   console.log("users", users);
    // }
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
  getUsers,
  getSingleUser,
  updateSingleUser,
  updateSingleUserLocation,
};

