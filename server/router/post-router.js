import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import {
  createPost,
  deletePost,
  getPosts,
  getRecentPosts,
  updatePost,
} from "../controllers/post-controller.js";

const postRouter = express.Router();

postRouter.route("/create-post").post(verifyToken, createPost);
postRouter.route("/getposts").get(getPosts);
postRouter.route("/getRecentPosts").get(getRecentPosts);
postRouter.route("/deletepost/:postId/:userId").delete(verifyToken, deletePost);
postRouter.route("/updatepost/:postId/:userId").put(verifyToken, updatePost);

export default postRouter;
