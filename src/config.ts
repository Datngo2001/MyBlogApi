import {config} from 'dotenv';

config()

export const { NODE_ENV, DATABASE_URL = "", PORT = 3001 } = process.env;
