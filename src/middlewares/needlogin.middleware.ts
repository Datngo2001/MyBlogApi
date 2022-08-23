import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "interfaces/auth.interface";

export default async function needloginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = (req as RequestWithUser).user;
  if (user) {
    next();
  } else {
    return res.status(401).json({ message: "You need to login" });
  }
}
