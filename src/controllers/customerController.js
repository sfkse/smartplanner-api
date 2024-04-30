const AppError = require("../helpers/errorHelper");
const { createCustomer } = require("../models/customerModel");

const createNewCustomer = async (req, res, next) => {
  const { name, plan } = req.body;

  if (!name || !plan) {
    return next(new AppError("Please provide name and plan", 400));
  }

  try {
    await createCustomer({ name, plan }, next);
    return res.status(201).json("Customer created successfully");
  } catch (error) {
    return next(new AppError(`Error in createNewCustomer: ${error}`));
  }
};

module.exports = {
  createNewCustomer,
};

