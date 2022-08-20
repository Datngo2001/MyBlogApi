import { Request } from "express";

export interface RequestWithUser extends Request {
    user: any;
}

export interface TokenData {
    _id: number;
    email: string
}