import { config } from "dotenv";

config();

export const {
  NODE_ENV,
  DATABASE_URL = "",
  PORT = 3001,
  CLIENT_URL = "",
  SECRET_KEY = "",
  FIREBASE_PRIVATE_KEY = "",
  FIREBASE_PRIVATE_KEY_ID = "",
  FIREBASE_PROJECT_ID = "",
  FIREBASE_CLIENT_EMAIL = "",
} = process.env;
