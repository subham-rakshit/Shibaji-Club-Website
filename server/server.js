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
import path from "path";

const __dirname = path.resolve(); // Get the directory in any place where the project is available.

const app = express();

// For request comming from deployed website or develpo url
const allowedOrigins = [
  "http://localhost:5173",
  "https://shibaji-sangha.onrender.com",
  "https://shibaji.netlify.app",
];

// Handle the CORS error while requesting
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

// app.use(express.static(path.join(__dirname, "/client/dist"))); // If u create project in create-react-app then "dist" will change into "build"

app.use("/api/auth", router);
app.use("/api/form", contactRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/video", videoRouter);
app.use("/api/comments", commentRouter);
app.use("/api/search", allContentRouter);
app.use("/api/trial", trailRouter);

// What ever address we have execpt those APIs is going to index.html which is our react project.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.use(errorMiddleware);

connectionDB().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
});
