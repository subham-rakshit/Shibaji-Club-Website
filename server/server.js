import express from "express";
import connectionDB from "./utils/mongodb.js";
import { APP_PORT } from "./config/envConfig.js";
import router from "./router/auth-router.js";
import errorMiddleware from "./middlewares/error-middleware.js";

const app = express();

app.use(express.json());

app.use("/api/auth", router);

app.use(errorMiddleware);

connectionDB().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
});
