import express from "express";
import bcrypt from "bcrypt";
import comparePassword from "../utils/comparePassword";
import { SECRET_KEY } from "../config";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { RegisterDto, SigninDto } from "dtos/auth.dtos";
import validateMiddleware from "../middlewares/validate.middleware";

const AuthRouter = express.Router();
const signErrorMessage = "Your email or password incorrect";

AuthRouter.post(
  "/register",
  validateMiddleware<RegisterDto>(),
  async (req, res) => {
    try {
      var newUser = new User(req.body);
      newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

      const result = await newUser.save();
      result.hash_password = undefined;

      return res.json({
        user: result,
        accessToken: jwt.sign(
          { email: result.email, _id: result._id },
          SECRET_KEY
        ),
      });
    } catch (error: any) {
      return res.status(400).send({
        message: "Your email existed",
      });
    }
  }
);

AuthRouter.post(
  "/signin",
  validateMiddleware<SigninDto>(),
  async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!comparePassword(req.body.password, user?.hash_password)) {
        return res.status(401).json({ message: signErrorMessage });
      }

      res.json({
        user: { ...user?.toObject(), hash_password: undefined },
        accessToken: jwt.sign(
          { email: user?.email, _id: user?._id },
          SECRET_KEY
        ),
      });
    } catch (error) {
      return res.status(401).json({ message: signErrorMessage });
    }
  }
);

export default AuthRouter;
