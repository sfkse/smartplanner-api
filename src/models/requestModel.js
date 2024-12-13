const pool = require("../configs/db.config");
const { getTimestampSeconds } = require("../helpers/dateHelper");
const { v4: uuidv4 } = require("uuid");

const getRequests = async (customerID, next) => {
  try {
    const [requests] = await pool.query(
      "SELECT r.idrequests, r.description, r.starttime, r.endtime, r.startdate, r.week, r.enddate, r.title, r.properties, r.created, r.updated, r.idusers, r.idcustomers, u.firstname, u.lastname FROM requests r JOIN users u ON r.idusers = u.idusers WHERE r.idcustomers=? ORDER BY r.created DESC",
      [customerID]
    );

    return requests.map((request) => {
      return {
        idrequests: request.idrequests,
        description: request.description,
        startTime: request.starttime,
        endTime: request.endtime,
        startDate: request.startdate,
        endDate: request.enddate,
        week: request.week,
        title: request.title,
        properties: JSON.parse(request.properties),
        idusers: request.idusers,
        idcustomers: request.idcustomers,
        user: {
          firstname: request.firstname,
          lastname: request.lastname,
        },
      };
    });
  } catch (error) {
    throw next(error);
  }
};

const getUserRequest = async (customerID, userID, next) => {
  try {
    const [requests] = await pool.query(
      "SELECT r.idrequests, r.description, r.starttime, r.endtime, r.startdate, r.week, r.enddate, r.title, r.properties, r.created, r.updated, r.idusers, r.idcustomers, u.firstname, u.lastname FROM requests r JOIN users u ON r.idusers = u.idusers WHERE r.idcustomers=? AND r.idusers=? ORDER BY r.created DESC",
      [customerID, userID]
    );

    return requests.map((request) => {
      return {
        idrequests: request.idrequests,
        description: request.description,
        startTime: request.starttime,
        endTime: request.endtime,
        startDate: request.startdate,
        endDate: request.enddate,
        week: request.week,
        title: request.title,
        properties: JSON.parse(request.properties),
        idusers: request.idusers,
        idcustomers: request.idcustomers,
        user: {
          firstname: request.firstname,
          lastname: request.lastname,
        },
      };
    });
  } catch (error) {
    throw next(error);
  }
};

const createRequest = async (requestData, idcustomers, next) => {
  const { properties, ...data } = requestData;
  const {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    week,
    userID,
  } = data;
  const requestID = uuidv4();
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "INSERT INTO requests (idrequests, description, title, properties, starttime, endtime, startdate, enddate, week, created, updated, idusers, idcustomers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        requestID,
        description,
        title,
        JSON.stringify(properties),
        startTime,
        endTime,
        startDate,
        endDate,
        week,
        created,
        updated,
        userID,
        idcustomers,
      ]
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = {
  getRequests,
  getUserRequest,
  createRequest,
};

