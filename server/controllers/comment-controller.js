import UserCommentCollection from "../models/comment-model.js";
import UserCollection from "../models/user-model.js";
import PostCollection from "../models/post-model.js";
import VideoCollection from "../models/video-model.js";

//* Create new comment -->
export const createComment = async (req, res, next) => {
  console.log(typeof req.body);
  const { userId, comment, postId } = req.body;

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

//* Get all comments from Individual post -->
export const getPostComments = async (req, res, next) => {
  try {
    const totalComments = await UserCommentCollection.find({
      postId: req.params.postId,
    });

    const startIndex = parseInt(req.query.index) || 0;
    const commentsArray = await UserCommentCollection.find({
      postId: req.params.postId,
    })
      .skip(startIndex)
      .sort({ createdAt: -1 })
      .limit(4);

    res
      .status(200)
      .json({ commentsArray, totlaComments: totalComments.length });
  } catch (error) {
    next(error);
  }
};

//* Create like functionality for a comment -->
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

//* Edit a specific comment -->
export const editComment = async (req, res, next) => {
  try {
    const commentInfo = await UserCommentCollection.findById(
      req.params.commentId
    );
    if (!commentInfo) {
      return res.status(404).json({
        message: "Comment not found!",
      });
    }
    if (req.user.userId !== commentInfo.userId && !res.user.isAdmin) {
      return res.status(403).json({
        message: "You are not allowed to edit this comment!",
      });
    }

    const editedComment = await UserCommentCollection.findByIdAndUpdate(
      req.params.commentId,
      {
        $set: {
          comment: req.body.comment,
        },
      },
      { new: true }
    );

    return res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

//* Delete a specific comment -->
export const deleteComment = async (req, res, next) => {
  try {
    const commentInfo = await UserCommentCollection.findById(
      req.params.commentId
    );
    if (!commentInfo) {
      return res.status(404).json({
        message: "Comment not found!",
      });
    }
    if (req.user.userId !== req.params.commentId && !req.user.isAdmin) {
      return res.status(403).json({
        message: "You are not allowed to delete this comment!",
      });
    }

    await UserCommentCollection.findByIdAndDelete(req.params.commentId);

    const totalComment = await UserCommentCollection.countDocuments();

    res.status(200).json({
      message: "The comment has been deleted successfully.",
      totalComment,
    });
  } catch (error) {
    next(error);
  }
};

//* Get all comments -->
export const getAllComments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated!",
      extraDetails: "You're not allowed to access all user's comments!",
    };
    next(authError);
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const commentsList = await UserCommentCollection.find()
      .skip(startIndex)
      .limit(limit);
    //? usersList gives user's details with their password. We have to remove those password in respond

    const totalNumberOfComments = await UserCommentCollection.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthCommentDetails = await UserCommentCollection.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      comments: commentsList,
      totalComments: totalNumberOfComments,
      lastMonthComments: lastMonthCommentDetails,
    });
  } catch (error) {
    next(error);
  }
};

//* Get User and Post details fro a comment -->
export const getUserAndPostDetailsOfAComment = async (req, res, next) => {
  try {
    const commentedUser = await UserCollection.findById(req.params.userId);
    const { password, ...rest } = commentedUser._doc;

    const commentedPost = await PostCollection.findById(req.params.postId);
    commentedPost &&
      res.status(200).json({ commentedUser: rest, commentedPost });

    const commentedVideo = await VideoCollection.findById(req.params.postId);
    commentedVideo &&
      res.status(200).json({ commentedUser: rest, commentedVideo });
  } catch (error) {
    next(error);
  }
};
