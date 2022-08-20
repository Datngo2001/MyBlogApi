import {config} from 'dotenv';

config()

export const { NODE_ENV, DATABASE_URL = "", PORT = 3001, CLIENT_URL = "",SECRET_KEY="" } = process.env;
