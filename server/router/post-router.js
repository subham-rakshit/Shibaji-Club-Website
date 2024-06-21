import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import { createPost, getPosts } from "../controllers/post-controller.js";

const postRouter = express.Router();

postRouter.route("/create-post").post(verifyToken, createPost);
postRouter.route("/getposts").get(getPosts);

export default postRouter;
