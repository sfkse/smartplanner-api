const AppError = require("../helpers/errorHelper");
const {
  getEvents,
  createEvent,
  getEventsByUserId,
  getEventById,
  joinEvent,
  getParticipantsByEventId,
} = require("../models/eventsModel");

const getAllEvents = async (req, res, next) => {
  try {
    const events = await getEvents(next);
    return res.status(200).json(events);
  } catch (error) {
    return next(
      new AppError(`Error in getAllEvents when fetching events: ${error}`)
    );
  }
};

const getSingleEvent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await getEventById(id, next);
    return res.status(200).json(event);
  } catch (error) {
    return next(
      new AppError(`Error in getSingleEvent when fetching event: ${error}`)
    );
  }
};

const getUserEvents = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.query;
  try {
    const events = await getEventsByUserId(id, status, next);
    return res.status(200).json(events);
  } catch (error) {
    return next(
      new AppError(`Error in getUserEvents when fetching events: ${error}`)
    );
  }
};
const createEvents = async (req, res, next) => {
  try {
    await createEvent(req.body, next);
    return res.status(201).json("Event created");
  } catch (error) {
    return next(
      new AppError(
        `Error in createEvents when creating event for user : ${error}`
      )
    );
  }
};

const joinSingleEvent = async (req, res, next) => {
  const { id } = req.params;
  const { idUser } = req.body;
  try {
    await joinEvent(id, idUser, next);
    return res.status(201).json("Event created");
  } catch (error) {
    return next(
      new AppError(
        `Error in joinSingleEvent when joining event for user : ${error}`
      )
    );
  }
};

const getEventParticipants = async (req, res, next) => {
  const { id } = req.params;
  try {
    const participants = await getParticipantsByEventId(id, next);

    return res.status(200).json(participants);
  } catch (error) {
    return next(
      new AppError(
        `Error in getEventParticipants when fetching participants: ${error}`
      )
    );
  }
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  getUserEvents,
  createEvents,
  joinSingleEvent,
  getEventParticipants,
};

