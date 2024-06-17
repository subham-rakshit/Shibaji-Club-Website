import express from "express";
import connectionDB from "./utils/mongodb.js";
import { APP_PORT } from "./config/envConfig.js";
import router from "./router/auth-router.js";
import userRouter from "./router/user-router.js";
import contactRouter from "./router/contact-router.js";
import errorMiddleware from "./middlewares/error-middleware.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router);
app.use("/api/form", contactRouter);
app.use("/api/user", userRouter);

app.use(errorMiddleware);
app.use(cookieParser());

connectionDB().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
});
