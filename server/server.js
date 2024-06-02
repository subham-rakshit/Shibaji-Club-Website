import express from "express";
import connectionDB from "./utils/mongodb.js";
import { APP_PORT } from "./config/envConfig.js";

const app = express();

app.use(express.json());

connectionDB().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
});
