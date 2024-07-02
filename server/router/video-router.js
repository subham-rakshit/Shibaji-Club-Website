import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import {
  createVideo,
  getVideos,
  deleteVideo,
  getRecentVideos,
  updateVideo,
} from "../controllers/video-controllers.js";

const videoRouter = express.Router();

videoRouter.route("/create-video").post(verifyToken, createVideo);
videoRouter.route("/getvideos").get(getVideos);
videoRouter.route("/getRecentVideos").get(getRecentVideos);
videoRouter
  .route("/deletevideo/:videoId/:userId")
  .delete(verifyToken, deleteVideo);
videoRouter
  .route("/updatevideo/:videoId/:userId")
  .put(verifyToken, updateVideo);

export default videoRouter;
