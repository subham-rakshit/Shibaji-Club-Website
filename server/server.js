import express from "express";
import connectionDB from "./utils/mongodb.js";
import { APP_PORT } from "./config/envConfig.js";
import router from "./router/auth-router.js";
import errorMiddleware from "./middlewares/error-middleware.js";

import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router);

app.use(errorMiddleware);

connectionDB().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
});
