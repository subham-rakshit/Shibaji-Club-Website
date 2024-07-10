import express from "express";
import connectionDB from "./utils/mongodb.js";
import { APP_PORT } from "./config/envConfig.js";
import router from "./router/auth-router.js";
import userRouter from "./router/user-router.js";
import contactRouter from "./router/contact-router.js";
import errorMiddleware from "./middlewares/error-middleware.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import postRouter from "./router/post-router.js";
import commentRouter from "./router/comment-router.js";
import videoRouter from "./router/video-router.js";
import allContentRouter from "./router/all-content-router.js";
import trailRouter from "./router/trial-router.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/form", contactRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/video", videoRouter);
app.use("/api/comments", commentRouter);
app.use("/api/search", allContentRouter);
app.use("/api/trial", trailRouter);

app.use(errorMiddleware);

connectionDB().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
});
