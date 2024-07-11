import dotenv from "dotenv";

dotenv.config();

export const {
  MONGODB_URI,
  APP_PORT,
  JWT_SIGNATURE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_MAIL,
  SMTP_PASSWORD,
} = process.env;
