import express from "express";
import { verifyToken } from "../utils/verify-user.js";
import { createTrialDetails } from "../controllers/trial-controller.js";

const trailRouter = express.Router();

trailRouter.route("/book-trial").post(verifyToken, createTrialDetails);

export default trailRouter;
