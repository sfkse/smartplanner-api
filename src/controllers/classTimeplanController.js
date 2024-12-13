const AppError = require("../helpers/errorHelper");
const {
  createClassTimeplan,
  getClassTimeplansExpanded,
  updateClassTimeplan,
  deleteTimeplan,
  getClassTimeplanByClass,
} = require("../models/classTimeplanModel");

const getCustomerClassTimeplans = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  try {
    const classTimeplans = await getClassTimeplansExpanded(idcustomers, next);
    return res.status(200).json(classTimeplans);
  } catch (error) {
    return next(
      new AppError(
        `Error in getCustomerClassTimeplans when fetching timeplans: ${error}`
      )
    );
  }
};

const getCustomerSingleClassTimeplans = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  const { id } = req.params;
  try {
    const classTimeplans = await getClassTimeplansExpanded(idcustomers, next);
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

const getClassTimePlanByClassId = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  const { id } = req.params;

  try {
    const classTimeplan = await getClassTimeplanByClass(idcustomers, id, next);
    return res.status(200).json(classTimeplan);
  } catch (error) {
    return next(
      new AppError(
        `Error in getClassTimePlanByClassId when fetching timeplans: ${error}`
      )
    );
  }
};

const createNewClassTimeplan = async (req, res, next) => {
  const { idcustomers } = res.locals.user;

  try {
    await createClassTimeplan(req.body, idcustomers, next);
    return res.status(201).json("Timeplan created");
  } catch (error) {
    return next(
      new AppError(`Error in createNewClassTimeplan when creating: ${error}`)
    );
  }
};

const updateClassTimeplanname = async (req, res, next) => {
  try {
    await updateClassTimeplan(req.body, next);
    return res.status(201).json("Timeplan updated");
  } catch (error) {
    return next(
      new AppError(`Error in updateClassTimeplan when updating: ${error}`)
    );
  }
};

const deleteClassTimeplan = async (req, res, next) => {
  const { idClassTimeplan } = req.body;
  try {
    await deleteTimeplan(idClassTimeplan, next);
    return res.status(200).json("Timeplan deleted");
  } catch (error) {
    return next(
      new AppError(`Error in deleteClassTimeplan when deleting: ${error}`)
    );
  }
};

module.exports = {
  getCustomerClassTimeplans,
  getCustomerSingleClassTimeplans,
  getClassTimePlanByClassId,
  createNewClassTimeplan,
  updateClassTimeplanname,
  deleteClassTimeplan,
};

