import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import {
  createComment,
  getPostComments,
  likeComment,
} from "../controllers/comment-controller.js";

const commentRouter = express.Router();

commentRouter.route("/create").post(verifyToken, createComment);
commentRouter.route("/getcomments/:postId").get(getPostComments);
commentRouter.route("/likeComment/:commentId").put(verifyToken, likeComment);

export default commentRouter;
