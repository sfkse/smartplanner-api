const jwt = require("jsonwebtoken");
const AppError = require("../helpers/errorHelper");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return next(new AppError("No authorization header provided", 401));

  const token = authHeader.split(" ")[1];
  if (!token) return next(new AppError("No token provided", 401));

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return next(new AppError("Token is not verified", 403));
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };

