import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import {
  createVideo,
  //   deletePost,
  //   getPosts,
  //   getRecentPosts,
  //   updatePost,
} from "../controllers/video-controllers.js";

const videoRouter = express.Router();

videoRouter.route("/create-video").post(verifyToken, createVideo);
// videoRouter.route("/getposts").get(getPosts);
// videoRouter.route("/getRecentPosts").get(getRecentPosts);
// videoRouter
//   .route("/deletepost/:postId/:userId")
//   .delete(verifyToken, deletePost);
// videoRouter.route("/updatepost/:postId/:userId").put(verifyToken, updatePost);

export default videoRouter;
