import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import { createPost } from "../controllers/post-controller.js";

const postRouter = express.Router();

postRouter.route("/create-post").post(verifyToken, createPost);

export default postRouter;
