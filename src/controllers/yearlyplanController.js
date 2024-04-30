const AppError = require("../helpers/errorHelper");
const {
  createYearlyplan,
  getYearlyplans,
  updateYearlyplan,
  deleteYearlyplan,
  getSingleYearlyplan,
} = require("../models/yearlyplanModel");

const getCustomerYearlyplans = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  try {
    const requests = await getYearlyplans(idcustomers, next);
    return res.status(200).json(requests);
  } catch (error) {
    return next(
      new AppError(`Error in getCustomerYearlyplans when creating: ${error}`)
    );
  }
};

const getCustomerSingleYearlyplan = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  const { id } = req.params;
  try {
    const classTimeplans = await getSingleYearlyplan(idcustomers, next);
    const singleClassTimeplan = classTimeplans.filter(
      (classTimeplan) => classTimeplan.idclasstimeplans === id
    );
    return res.status(200).json(singleClassTimeplan);
  } catch (error) {
    return next(
      new AppError(
        `Error in getCustomerSingleClassTimeplans when fetching timeplans: ${error}`
      )
    );
  }
};

const createNewYearlyplan = async (req, res, next) => {
  const { idcustomers } = res.locals.user;

  try {
    await createYearlyplan(req.body, idcustomers, next);
    return res.status(201).json("Request created");
  } catch (error) {
    return next(
      new AppError(`Error in createNewYearlyplan when creating: ${error}`)
    );
  }
};

const updateCustomerYearlyPlan = async (req, res, next) => {
  const { idcustomers } = res.locals.user;

  try {
    await updateYearlyplan(idcustomers, req.body, next);
    return res.status(200).json("Plan updated successfully");
  } catch (error) {
    return next(
      new AppError(
        `Error in updateCustomerYearlyPlan when updating plan: ${error}`
      )
    );
  }
};

const removeCustomerYearlyPlan = async (req, res, next) => {
  const { idyearlyplans } = req.body;
  console.log(req.body);
  try {
    await deleteYearlyplan(idyearlyplans, next);
    return res.status(200).json("Plan removed successfully");
  } catch (error) {
    return next(
      new AppError(
        `Error in removeCustomerYearlyPlan when removing plan: ${error}`
      )
    );
  }
};

module.exports = {
  getCustomerYearlyplans,
  createNewYearlyplan,
  getCustomerSingleYearlyplan,
  updateCustomerYearlyPlan,
  removeCustomerYearlyPlan,
};

