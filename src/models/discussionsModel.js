const pool = require("../configs/db.config");
const { v4: uuidv4 } = require("uuid");
const { getTimestampSeconds } = require("../helpers/dateHelper");

const getDiscussions = async (next) => {
  try {
    const result = await pool.query(
      "SELECT d.iddiscussions, d.title, d.content, d.created, d.updated, d.upvote, d.downvote, d.tags, c.iddiscussioncomments, c.idusers, c.comment, u.firstname, u.lastname, u.username, u.skills, u.location FROM discussions d LEFT JOIN discussioncomments c ON d.iddiscussions = c.iddiscussions LEFT JOIN users u ON d.owner = u.idusers ORDER BY d.created DESC"
    );

    const discussionsWithComments = result[0].reduce((acc, row) => {
      const discussionId = row.iddiscussions;

      // Find the discussion in the accumulator array
      let discussion = acc.find((d) => d.iddiscussions === discussionId);

      // If the discussion doesn't exist, create a new one
      if (!discussion) {
        discussion = {
          iddiscussions: discussionId,
          title: row.title,
          content: row.content,
          tags: JSON.parse(row.tags),
          upvote: row.upvote,
          downvote: row.downvote,
          created: row.created,
          comments: [], // Initialize an empty array for comments
          user: {
            idusers: row.idusers,
            firstname: row.firstname,
            lastname: row.lastname,
            skills: JSON.parse(row.skills),
            location: JSON.parse(row.location),
          },
        };
        acc.push(discussion);
      }

      // Add the comment to the discussion's comments array
      if (row.iddiscussioncomments) {
        discussion.comments.push({
          iddiscussioncomments: row.iddiscussioncomments,
          comment: row.comment,
          created: row.created,
        });
      }

      return acc;
    }, []);

    return discussionsWithComments;
  } catch (error) {
    return next(error);
  }
};

const getDiscussionWithComments = async (id, next) => {
  try {
    const result = await pool.query(
      "SELECT d.iddiscussions, d.title, d.content, d.created, d.updated, d.upvote, d.downvote, d.tags, c.iddiscussioncomments, c.idusers, c.comment, u.firstname, u.lastname, u.username, u.skills, u.location FROM discussions d LEFT JOIN discussioncomments c ON d.iddiscussions = c.iddiscussions LEFT JOIN users u ON c.idusers = u.idusers WHERE d.iddiscussions=? ORDER BY d.created DESC",
      [id]
    );
    console.log("res", result[0]);
    const discussionWithComments = result[0].reduce((acc, row) => {
      const discussionId = row.iddiscussions;

      // Find the discussion in the accumulator array
      let discussion = acc.find((d) => d.iddiscussions === discussionId);

      // If the discussion doesn't exist, create a new one
      if (!discussion) {
        discussion = {
          iddiscussions: discussionId,
          title: row.title,
          content: row.content,
          tags: JSON.parse(row.tags),
          upvote: row.upvote,
          downvote: row.downvote,
          created: row.created,
          comments: [], // Initialize an empty array for comments
          user: {
            idusers: row.idusers,
            firstname: row.firstname,
            lastname: row.lastname,
            skills: JSON.parse(row.skills),
            location: JSON.parse(row.location),
            username: row.username,
          },
        };
        acc.push(discussion);
      }

      // Add the comment to the discussion's comments array
      if (row.iddiscussioncomments) {
        discussion.comments.push({
          iddiscussioncomments: row.iddiscussioncomments,
          comment: row.comment,
          created: row.created,
        });
      }

      return acc;
    }, []);

    return discussionWithComments[0];
  } catch (error) {
    return next(error);
  }
};

const getDiscussionById = async (id, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM discussions WHERE iddiscussions = ?",
      [id]
    );

    const response = result[0].map((discussion) => ({
      ...discussion,
      tags: JSON.parse(discussion.tags),
    }));

    return response;
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getDiscussionsByUserId = async (iduser, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM discussions WHERE owner=? order by updated desc",
      [iduser]
    );
    return result[0];
  } catch (error) {
    return next(error);
  }
};

const createDiscussion = async (data, next) => {
  const { title, content, owner, tags } = data;

  const discussionID = uuidv4();
  const created = getTimestampSeconds();
  const updated = getTimestampSeconds();
  try {
    const result = await pool.query(
      "INSERT INTO discussions (iddiscussions, title, content, created, updated, owner, tags) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        discussionID,
        title,
        content,
        created,
        updated,
        owner,
        JSON.stringify(tags),
      ]
    );
    return result[0];
  } catch (error) {
    return next(error);
  }
};

const createComment = async (id, data, next) => {
  const { comment, idUser } = data;

  const commentID = uuidv4();
  const created = getTimestampSeconds();
  try {
    const result = await pool.query(
      "INSERT INTO discussioncomments (iddiscussioncomments, iddiscussions, comment, idusers, created) VALUES (?, ?, ?, ?, ?)",
      [commentID, id, comment, idUser, created]
    );
    return result[0];
  } catch (error) {
    return next(error);
  }
};

const getCommentsByDiscussionId = async (id, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM discussioncomments WHERE iddiscussions = ?",
      [id]
    );
    return result[0];
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDiscussions,
  getDiscussionWithComments,
  getDiscussionById,
  getDiscussionsByUserId,
  createDiscussion,
  createComment,
  getCommentsByDiscussionId,
};

