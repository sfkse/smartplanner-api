const validator = require("email-validator");
const bcrypt = require("bcrypt");

const validateCredentials = (
  email,
  firstName,
  lastName,
  location,
  password,
  passwordConfirm
) => {
  if (
    !email ||
    !firstName ||
    !lastName ||
    !location ||
    !password ||
    !passwordConfirm
  )
    return { error: true, status: 400, message: "Missing credentials" };

  if (!validator.validate(email))
    return { error: true, status: 403, message: "Email is not valid" };

  if (password !== passwordConfirm)
    return { error: true, status: 400, message: "Passwords do not match" };

  return { error: false };
};

const isCorrectPassword = async (incomingPassword, userPassword) => {
  return await bcrypt.compare(incomingPassword, userPassword);
};

module.exports = {
  validateCredentials,
  isCorrectPassword,
};

