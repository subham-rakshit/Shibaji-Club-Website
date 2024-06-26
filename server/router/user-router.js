import express from "express";
import {
  deleteUserDetails,
  getAllUsers,
  getUserInfo,
  signOut,
  updateUserDetails,
} from "../controllers/user-controller.js";
import { verifyToken } from "../utils/verify-user.js";

const userRouter = express.Router();

userRouter.route("/update/:userId").put(verifyToken, updateUserDetails);
userRouter.route("/delete/:userId").delete(verifyToken, deleteUserDetails);
userRouter.route("/signout").post(signOut);
userRouter.route("/getusers").get(verifyToken, getAllUsers);
userRouter.route("/getuser/:userId").get(getUserInfo);

export default userRouter;
