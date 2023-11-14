const AppError = require("../helpers/errorHelper");
const {
  getDiscussions,
  getDiscussionById,
  getDiscussionsByUserId,
  createDiscussion,
  createComment,
  getCommentsByDiscussionId,
} = require("../models/discussionsModel");

const getAllDiscussions = async (req, res, next) => {
  try {
    const discussions = await getDiscussions(next);
    return res.status(200).json(discussions);
  } catch (error) {
    new AppError(`Error in getAllDiscussions when fetching events: ${error}`);
  }
};

const getSingleDiscussion = async (req, res, next) => {
  const { id } = req.params;
  try {
    const discussion = await getDiscussionById(id, next);
    return res.status(200).json(discussion);
  } catch (error) {
    new AppError(`Error in getSingleDiscussion when fetching event: ${error}`);
  }
};

const getUserDiscussions = async (req, res, next) => {
  const { id } = req.params;

  try {
    const discussions = await getDiscussionsByUserId(id, next);
    return res.status(200).json(discussions);
  } catch (error) {
    new AppError(`Error in getUserDiscussions when fetching events: ${error}`);
  }
};

const createDiscussions = async (req, res, next) => {
  try {
    const isCreated = await createDiscussion(req.body, next);
    if (isCreated) {
      return res.status(201).json("Discussion created");
    }
    return next(new AppError("Error in createDiscussions when creating event"));
  } catch (error) {
    new AppError(
      `Error in createDiscussions when creating event for user : ${error}`
    );
  }
};

const createDiscussionComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const isCreated = await createComment(id, req.body, next);
    if (isCreated) {
      return res.status(201).json("Comment created");
    }
    return next(
      new AppError("Error in createDiscussionComment when creating comment")
    );
  } catch (error) {
    new AppError(
      `Error in createDiscussionComment when creating comment for user : ${error}`
    );
  }
};

const getDiscussionComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await getCommentsByDiscussionId(id, next);
    return res.status(200).json(comments);
  } catch (error) {
    new AppError(
      `Error in getDiscussionComments when fetching comments: ${error}`
    );
  }
};

module.exports = {
  getAllDiscussions,
  getSingleDiscussion,
  getUserDiscussions,
  createDiscussions,
  createDiscussionComment,
  getDiscussionComments,
};

