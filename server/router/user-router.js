import express from "express";
import {
  deleteUserDetails,
  updateUserDetails,
} from "../controllers/user-controller.js";
import { verifyToken } from "../utils/verify-user.js";

const userRouter = express.Router();

userRouter.route("/update/:userId").put(verifyToken, updateUserDetails);
userRouter.route("/delete/:userId").delete(verifyToken, deleteUserDetails);

export default userRouter;
