const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../helpers/errorHelper");
const { getSingleUser } = require("../models/userModel");

const verifyJWTMiddleware = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token)
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    // 3) Check if user still exists
    const currentUser = await getSingleUser(decoded.id);
    if (currentUser.length === 0)
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError("Error when verifying JWT", 500));
  }
};

module.exports = { verifyJWTMiddleware };

