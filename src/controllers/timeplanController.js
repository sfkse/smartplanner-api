const AppError = require("../helpers/errorHelper");
const { createTimeplan, getTimeplans } = require("../models/timeplanModel");

const getCustomerTimeplans = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  try {
    const timeplans = await getTimeplans(idcustomers, next);
    return res.status(200).json(timeplans);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createNewTimeplan = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  const { name } = req.body;
  try {
    await createTimeplan({ name, idcustomers }, next);
    return res.status(201).json("Timeplan created");
  } catch (error) {
    return next(
      new AppError(`Error in createNewTimeplan when creating: ${error}`)
    );
  }
};

module.exports = {
  getCustomerTimeplans,
  createNewTimeplan,
};

