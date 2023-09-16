const AppError = require("../helpers/errorHelper");
const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return next(new AppError("Token is not verified", 403));
    req.user = user;
  });

  next();
};

module.exports = { verifyTokenMiddleware };

