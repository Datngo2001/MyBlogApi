import {config} from 'dotenv';

config()

export const { NODE_ENV, DATABASE_URL = "" } = process.env;
