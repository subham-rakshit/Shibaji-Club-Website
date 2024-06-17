import express from "express";
import { updateUserDetails } from "../controllers/user-controller.js";
import { verifyToken } from "../utils/verify-user.js";

const userRouter = express.Router();

userRouter.route("/update/:userId").put(verifyToken, updateUserDetails);

export default userRouter;
