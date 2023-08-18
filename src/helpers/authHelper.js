const validator = require("email-validator");
const jwt = require("jsonwebtoken");

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.idusers, userType: user.userType },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: 86400, // 24 hours
    }
  );
  return token;
};

const validateEmail = (email) => {
  return validator.validate(email);
};

module.exports = {
  getOffset,
  emptyOrRows,
  generateToken,
  validateEmail,
};

