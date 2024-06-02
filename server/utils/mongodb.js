import mongoose from "mongoose";
import { MONGODB_URI } from "../config/envConfig.js";

const URI = MONGODB_URI;

const connectionDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection Successful to Database");
  } catch (error) {
    console.log(`Database Connection Error :: ${error}`);
    process.exit(0);
  }
};

export default connectionDB;
