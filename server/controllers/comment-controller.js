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

export const getPostComments = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.index) || 0;
    const commentsArray = await UserCommentCollection.find({
      postId: req.params.postId,
    })
      .skip(startIndex)
      .sort({ createdAt: -1 })
      .limit(4);

    console.log(commentsArray);
    const totlaComments = await UserCommentCollection.countDocuments();

    res.status(200).json({ commentsArray, totlaComments });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const commentInfo = await UserCommentCollection.findById(
      req.params.commentId
    );
    if (!commentInfo) {
      return res.status(404).json({
        message: "Comment not found!",
      });
    }
    //? Check if the req.user.userId is present in comment.likes array or not
    const userIndex = commentInfo.likes.indexOf(req.user.userId);
    console.log(userIndex);
    if (userIndex === -1) {
      commentInfo.likes.push(req.user.userId);
      commentInfo.numberOfLikes += 1;
    } else {
      commentInfo.likes.splice(userIndex, 1);
      if (commentInfo.numberOfLikes > 0) {
        commentInfo.numberOfLikes -= 1;
      } else {
        commentInfo.numberOfLikes = 0;
      }
    }

    await commentInfo.save();

    res.status(200).json(commentInfo);
  } catch (error) {
    next(error);
  }
};
