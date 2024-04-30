const AppError = require("../helpers/errorHelper");
const { createRequest, getRequests } = require("../models/requestModel");

const getCustomerRequests = async (req, res, next) => {
  const { idcustomers } = res.locals.user;
  console.log(idcustomers);
  try {
    const requests = await getRequests(idcustomers, next);
    return res.status(200).json(requests);
  } catch (error) {
    return next(
      new AppError(`Error in getCustomerRequests when creating: ${error}`)
    );
  }
};

const createNewRequest = async (req, res, next) => {
  const { idcustomers } = res.locals.user;

  try {
    await createRequest(req.body, idcustomers, next);
    return res.status(201).json("Request created");
  } catch (error) {
    return next(
      new AppError(`Error in createNewRequest when creating: ${error}`)
    );
  }
};

module.exports = {
  getCustomerRequests,
  createNewRequest,
};

