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

//? Verify email address API Route --->
router.route("/verify-email").post(authControllerObject.verifyEmail);

//? Login Api Route --->
router
  .route("/login")
  .post(validateLoginUser, validateUsers, authControllerObject.loginController);

//? Google Login and Register Api Route --->
router.route("/google").post(authControllerObject.googleController);

//? Token is present in Browser check API route -->
router.route("/check-token").get(authControllerObject.checkRequestingToken);

export default router;
