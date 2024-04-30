const pool = require("../configs/db.config");
const { getTimestampSeconds } = require("../helpers/dateHelper");
const { v4: uuidv4 } = require("uuid");

const getRequests = async (customerID, next) => {
  try {
    const [requests] = await pool.query(
      "SELECT r.idrequests, r.description, r.starttime, r.endtime, r.startdate, r.enddate, r.title, r.properties, r.created, r.updated, r.idusers, r.idcustomers, u.firstname, u.lastname FROM requests r JOIN users u ON r.idusers = u.idusers WHERE r.idcustomers=? ORDER BY r.created DESC",
      [customerID]
    );

    return requests.map((request) => {
      return {
        requestID: request.idrequests,
        description: request.description,
        startTime: request.starttime,
        endTime: request.endtime,
        startDate: request.startdate,
        endDate: request.enddate,
        title: request.title,
        properties: JSON.parse(request.properties),
        userID: request.idusers,
        customerID: request.idcustomers,
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
  console.log("data", data);
  // Extract data object form requestData and remaining properties to different variables
  const { title, description, startDate, endDate, startTime, endTime, userID } =
    data;
  // Extract properties from requestData

  console.log("properties", data, properties);
  const requestID = uuidv4();
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    await pool.query(
      "INSERT INTO requests (idrequests, description, title, properties, starttime, endtime, startdate, enddate, created, updated, idusers, idcustomers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        requestID,
        description,
        title,
        JSON.stringify(properties),
        startTime,
        endTime,
        startDate,
        endDate,
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
  createRequest,
};

