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

//? Remove user API route -->
router.route("/remove-user").delete(authControllerObject.removeUser);

//? Resend OTP API route -->
router.route("/resend-token").put(authControllerObject.resendToken);

//? Forget Password API route -->
router.route("/forget-password").post(authControllerObject.forgetPassword);

//? Reset password API route -->
router.route("/reset-password").post(authControllerObject.resetPassword);

export default router;
