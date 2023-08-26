import dotenv from "dotenv";
dotenv.config();

export const {
  JWT_SECRET,
  DATABASE_URL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;

export const PORT = process.env.PORT || 3000;
