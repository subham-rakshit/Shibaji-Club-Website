import UserCommentCollection from "../models/comment-model.js";

export const createComment = async (req, res, next) => {
  const { userId, postId, comment } = req.body;

  try {
    if (req.user.userId !== userId) {
      const authError = {
        status: 403,
        message: "Authentication Error!",
        extraDetails: "Your are not authorized to leave a comment!",
      };
      return next(authError);
    }

    const commentCreated = await UserCommentCollection.create({
      userId,
      postId,
      comment: comment.trim(),
    });

    res.status(201).json({
      message: "Thank you for sharing your thoughts.",
      commentDetails: commentCreated,
    });
  } catch (error) {
    next(error);
  }
};
