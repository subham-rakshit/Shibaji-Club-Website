import express from "express";
import authControllerObject from "../controllers/auth-controllers.js";

const router = express.Router();

//? Home Route --->
router.route("/").get(authControllerObject.homeController);

export default router;
