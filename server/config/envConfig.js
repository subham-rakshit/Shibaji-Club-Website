import dotenv from "dotenv";

dotenv.config();

export const { MONGODB_URI, APP_PORT, JWT_SIGNATURE } = process.env;
