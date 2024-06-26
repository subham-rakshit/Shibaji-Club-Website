import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getAllComments,
  getUserAndPostDetailsOfAComment,
} from "../controllers/comment-controller.js";

const commentRouter = express.Router();

commentRouter.route("/create").post(verifyToken, createComment);
commentRouter.route("/getcomments/:postId").get(getPostComments);
commentRouter.route("/getAllComments").get(verifyToken, getAllComments);
commentRouter.route("/likeComment/:commentId").put(verifyToken, likeComment);
commentRouter.route("/editComment/:commentId").put(verifyToken, editComment);
commentRouter
  .route("/deleteComment/:commentId")
  .delete(verifyToken, deleteComment);
commentRouter
  .route("/getUserAndPostDetails/:userId/:postId")
  .get(getUserAndPostDetailsOfAComment);

export default commentRouter;
