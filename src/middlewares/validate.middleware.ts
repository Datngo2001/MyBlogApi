import { NextFunction, Response } from "express";

export default function validateMiddleware<Type>(
  validateFrom: string | "body" | "query" | "params" = "body"
) {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const data = req[validateFrom] as Type;
      req[validateFrom] = data;
      next();
    } catch (error) {
      res.status(400).json({ message: "Input data incorrect format" });
      next(error);
    }
  };
}
