import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import {
  createTrialDetails,
  deleteTrial,
  getAllTrialsData,
  updateTrial,
} from "../controllers/trial-controller.js";

const trailRouter = express.Router();

trailRouter.route("/book-trial").post(verifyToken, createTrialDetails);
trailRouter.route("/get-trials-data").get(getAllTrialsData);
trailRouter.route("/confirm-trial/:trialId").put(verifyToken, updateTrial);
trailRouter
  .route("/delete-trial-data/:trialId")
  .delete(verifyToken, deleteTrial);

export default trailRouter;
