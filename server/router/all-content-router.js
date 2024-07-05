import express from "express";
import { getAllContentSearchPage } from "../controllers/all-content-controller.js";

const allContentRouter = express.Router();

allContentRouter.route("/allcontent").get(getAllContentSearchPage);

export default allContentRouter;
