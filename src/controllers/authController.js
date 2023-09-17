const jwt = require("jsonwebtoken");

const { getSingleUserByEmail, createUser } = require("../models/userModel");

const AppError = require("../helpers/errorHelper");
const { getTimestampSeconds } = require("../helpers/dateHelper");
const {
  validateCredentials,
  isCorrectPassword,
} = require("../helpers/authhelper");

/**
 ** @desc Register new user
 */
const register = async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    location,
    skills,
    password,
    passwordConfirm,
  } = req.body;

  const validationResult = validateCredentials(
    email,
    firstName,
    lastName,
    location,
    password,
    passwordConfirm
  );
  if (validationResult.error)
    return next(
      new AppError(validationResult.message, validationResult.status)
    );

  const user = await getSingleUserByEmail(email, next);
  if (user.length > 0) return next(new AppError("User already exists", 409));

  const updatedAt = getTimestampSeconds();
  const userType = 0;
  const userObj = {
    email,
    firstName,
    lastName,
    updatedAt,
    userType,
    location,
    skills,
    password,
  };

  const newUser = await createUser(userObj, next);
  delete newUser[0]["password"];

  createSendToken(newUser[0], 201, res, next);
};

/**
 ** @desc Login user
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  // Check if user exists && password is correct
  const user = await getSingleUserByEmail(email, next);

  if (
    user.length === 0 ||
    !(user.length > 0 && (await isCorrectPassword(password, user[0].password)))
  )
    return next(new AppError("Incorrect email or password", 401));

  // If everything ok, send token to client
  createSendToken(user[0], 200, res, next);
};

/**
 ** @desc Auth response helpers
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, next) => {
  try {
    const token = signToken(user.idusers);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    return next(new AppError(`Something went wrong ${error}`));
  }
};

module.exports = {
  login,
  register,
};

