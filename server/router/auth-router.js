import express from "express";
import authControllerObject from "../controllers/auth-controllers.js";

import {
  validateLoginUser,
  validateRegisterUser,
  validateUsers,
} from "../validator/auth-validator.js";

const router = express.Router();

//? Home Api Route --->
router.route("/").get(authControllerObject.homeController);

//? Register Api Route --->
router
  .route("/register")
  .post(
    validateRegisterUser,
    validateUsers,
    authControllerObject.registerController
  );

//? Login Api Route --->
router
  .route("/login")
  .post(validateLoginUser, validateUsers, authControllerObject.loginController);

//? Google Api Route --->
router.route("/google").post(authControllerObject.googleController);

export default router;
