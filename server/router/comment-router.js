import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import {
  createComment,
  getPostComments,
} from "../controllers/comment-controller.js";

const commentRouter = express.Router();

commentRouter.route("/create").post(verifyToken, createComment);
commentRouter.route("/getcomments/:postId").get(getPostComments);

export default commentRouter;
