import { Request } from "express";

export interface RequestWithUser extends Request {
  user: TokenData;
}

export interface TokenData {
  _id: string;
  email: string;
}
