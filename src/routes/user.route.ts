import User from "../models/user.model";
import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import { EditProfileDto } from "../dtos/user.dtos";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const UserRouter = express.Router();

UserRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ ...user?.toObject(), hash_password: undefined });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

UserRouter.put(
  "/",
  needloginMiddleware,
  validateMiddleware<EditProfileDto>(),
  async (req, res) => {
    try {
      const user = await User.findById((req as RequestWithUser).user._id);
      user?.$set(req.body);
      const result = await user?.save();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default UserRouter;
