const bcrypt = require("bcrypt");

const { getUserByEmail, addUser } = require("../models/userModel");

const { getTimestampSeconds } = require("../helpers/dateHelper");
const { validateEmail, generateToken } = require("../helpers/authhelper");
const AppError = require("../helpers/errorHelper");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) return next(new AppError("Email is not valid"));
    if ((!email, !password))
      return next(new AppError("Missing credentials", 400));

    const user = await getUserByEmail(email, next);
    if (user.length > 0) return next(new AppError("User already exists", 409));

    const updatedAt = getTimestampSeconds();
    const userType = 0;
    const userObj = { email, password, updatedAt, userType };

    const newUser = await addUser(userObj, next);
    const token = generateToken(newUser[0]);

    if (token) {
      delete newUser[0]["password"];
      return res.status(201).json({ ...newUser[0], accessToken: token });
    } else return next(new AppError("Error when creating token"));
  } catch (error) {
    return next(new AppError("Something went wrong!"));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) return AppError("Email is not valid");
    if ((!email, !password)) return AppError("Missing credentials", 400);

    const user = await getUserByEmail(email, next);
    if (user.length === 0)
      return next(new AppError("Incorrect email or password", 403));

    const isvalidPassword = await bcrypt.compare(password, user[0]["password"]);
    if (!isvalidPassword)
      return next(new AppError("Incorrect email or password", 403));

    const token = generateToken(user[0]);
    if (token) {
      delete user[0]["password"];
      return res.status(200).json({ ...user[0], accessToken: token });
    } else return next(new AppError("Error when creating token"));
  } catch (error) {
    return next(new AppError(`Something went wrong ${error}`));
  }
};

module.exports = {
  login,
  register,
};

