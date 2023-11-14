const pool = require("../configs/db.config");
const { v4: uuidv4 } = require("uuid");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getEvents = async (next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE status=1 order by date desc"
    );

    return result[0];
  } catch (error) {
    return next(error);
  }
};

const getEventById = async (id, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE idevents = ? and status=1",
      [id]
    );

    return result[0];
  } catch (error) {
    return next(error);
  }
};

const getEventsByUserId = async (iduser, status, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE creator=? and status=? order by updated desc",
      [iduser, status]
    );

    const response = result[0].map((event) => ({
      ...event,
      tags: JSON.parse(event.timeline),
    }));
    console.log("response", response);
    return response;
  } catch (error) {
    return next(error);
  }
};

const createEvent = async (data, next) => {
  const { title, description, date, location, timeline, creator, status } =
    data;

  const eventID = uuidv4();
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();

  try {
    const result = await pool.query(
      "INSERT INTO events (idevents, status, title, description, date, location, timeline, creator, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        eventID,
        status,
        title,
        description,
        date,
        location,
        JSON.stringify(timeline),
        creator,
        created,
        updated,
      ]
    );

    if (result[0].affectedRows) return true;
    else return false;
  } catch (error) {
    return next(error);
  }
};

const joinEvent = async (idEvent, idUser, next) => {
  try {
    const idEventParticipants = uuidv4();
    const created = getTimestampSeconds();
    const updated = getTimestampSeconds();

    const result = await pool.query(
      "INSERT INTO eventparticipants (ideventparticipants, idusers, created, updated, idevents) VALUES (?, ?, ?, ?, ?)",
      [idEventParticipants, idUser, created, updated, idEvent]
    );
    if (result[0].affectedRows) return true;
    else return false;
  } catch (error) {
    return next(error);
  }
};

const getParticipantsByEventId = async (id, next) => {
  try {
    const result = await pool.query(
      "SELECT idusers, idevents FROM eventparticipants WHERE idevents = ?",
      [id]
    );

    return result[0];
  } catch (error) {
    return next(error);
  }
};

const getJoinedEventsByUserId = async (id, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE idevents IN (SELECT idevents FROM eventparticipants WHERE idusers = ?)",
      [id]
    );

    return result[0];
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getEvents,
  getEventById,
  getEventsByUserId,
  createEvent,
  joinEvent,
  getParticipantsByEventId,
  getJoinedEventsByUserId,
};

