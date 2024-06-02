import express from "express";
import authControllerObject from "../controllers/auth-controllers.js";

import { signUpSchema, loginSchema } from "../validator/auth-validator.js";
import validate from "../middlewares/validate-middleware.js";

const router = express.Router();

//? Home Api Route --->
router.route("/").get(authControllerObject.homeController);

//? Register Api Route --->
router
  .route("/register")
  .post(validate(signUpSchema), authControllerObject.registerController);

//? Login Api Route --->
router
  .route("/login")
  .post(validate(loginSchema), authControllerObject.loginController);

export default router;
