const jwt = require("jsonwebtoken");

const {
  getSingleUserByEmail,
  createUser,
  getUserById,
  setRegistered,
} = require("../models/userModel");

const AppError = require("../helpers/errorHelper");
const {
  validateCredentials,
  isCorrectPassword,
} = require("../helpers/authHelper");

/**
 ** @desc Register new user
 */
const register = async (req, res, next) => {
  const { email, password, firstName, lastName, profession, confirmPassword } =
    req.body;

  const validationResult = validateCredentials(
    email,
    firstName,
    lastName,
    profession,
    password,
    confirmPassword
  );
  if (validationResult.error)
    return next(
      new AppError(validationResult.message, validationResult.status)
    );

  const user = await getSingleUserByEmail(email, next);

  if (user.length > 0) return next(new AppError("User already exists", 409));

  const userObj = {
    email,
    firstName,
    lastName,
    profession,
    password,
    customerID: res.locals.user.idcustomers,
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
  return createSendToken(user[0], 200, res, next);
};

/**
 ** @desc Auth response helpers
 */
const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, next) => {
  try {
    const tokenPayload = {
      idusers: user.idusers,
      customerID: user.idcustomers,
      userType: user.usertype,
    };
    const token = signToken(tokenPayload);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    return res.status(statusCode).json({
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

const logout = (req, res) => {
  res
    .cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .send();
};

const getLoggedInUser = async (req, res) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = jwt.verify(
        req.cookies.jwt,
        process.env.JWT_ACCESS_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await getUserById(decoded.idusers);
      if (!currentUser) {
        return res.status(200).json(null);
      }

      // 3) Check if user changed password after the token was issued
      // if (currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }

      // THERE IS A LOGGED IN USER
      delete currentUser[0].password;
      // const user = {
      //   idusers: currentUser[0].idusers,
      //   firstName: currentUser[0].firstname,
      //   lastName: currentUser[0].lastname,
      //   email: currentUser[0].email,
      //   userType: currentUser[0].usertype,
      //   skills: currentUser[0].skills,
      // }
      return res.status(200).json(currentUser[0]);
    } catch (err) {
      return res.status(200).json(null);
    }
  }
  return res.status(200).json(null);
};

const setUserRegistered = async (req, res, next) => {
  const { idUser } = req.body;
  try {
    const updatedUser = await setRegistered(idUser, next);
    if (!updatedUser) return next(new AppError("Error when updating user"));

    return res.status(200).json("User updated");
  } catch (error) {
    return next(
      new AppError(`Error in setUserRegistered when updating user: ${error}`)
    );
  }
};

module.exports = {
  login,
  register,
  logout,
  getLoggedInUser,
  setUserRegistered,
};

