import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "interfaces/auth.interface";

export default async function needloginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req as RequestWithUser;
  if (!user) {
    res.status(401).json({ message: "You need to login" });
  }
  next();
}
