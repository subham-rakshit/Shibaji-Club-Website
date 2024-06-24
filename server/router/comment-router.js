import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import { createComment } from "../controllers/comment-controller.js";

const commentRouter = express.Router();

commentRouter.route("/create").post(verifyToken, createComment);

export default commentRouter;
