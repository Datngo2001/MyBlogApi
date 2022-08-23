import { SECRET_KEY } from "../config";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export default async function authenMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    let tokeData;
    try {
      tokeData = await jsonwebtoken.verify(
        req.headers.authorization.split(" ")[1],
        SECRET_KEY
      );
      req.user = tokeData;
      next();
    } catch (error) {
      console.log(error);
      req.user = undefined;
      next();
    }
  } else {
    req.user = undefined;
    next();
  }
}
