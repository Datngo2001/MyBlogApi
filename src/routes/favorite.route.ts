import Favorite from "../models/favorite.model";
import express from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";
import { CreateFavoriteDto, GetFavoriteArticleDto } from "dtos/favorite.dto";

const FavoriteRouter = express.Router();

FavoriteRouter.get(
  "/of-article/:articleID",
  needloginMiddleware,
  async (req, res) => {
    try {
      const favorite = await Favorite.findOne({
        article: req.params.articleID,
        user: (req as RequestWithUser).user._id,
      }).sort({ createDate: "desc" });

      res.json(favorite?.toObject());
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

FavoriteRouter.get(
  "/favorite-article",
  validateMiddleware<GetFavoriteArticleDto>("query"),
  async (req, res) => {
    try {
      const limit = parseInt(req.query.limit.toString());
      const skip = (parseInt(req.query.page.toString()) - 1) * limit;

      const query = Favorite.find({
        user: req.query.user,
      })
        .sort({ createDate: "desc" })
        .populate({
          path: "article",
          populate: {
            path: "author",
            model: "User",
          },
        });

      const favorites = await query.clone().skip(skip).limit(limit);
      const count = await query.clone().count();

      res.json({
        favorites: favorites.map((favorite) => ({
          ...favorite?.toObject(),
        })),
        count: Math.floor(count / limit) + 1,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

FavoriteRouter.post(
  "/",
  needloginMiddleware,
  validateMiddleware<CreateFavoriteDto>(),
  async (req, res) => {
    try {
      const favorite = new Favorite();
      favorite?.$set({ user: (req as RequestWithUser).user._id });
      favorite?.$set({ article: req.body.article });
      const result = await favorite?.save();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

FavoriteRouter.delete("/:articleId", needloginMiddleware, async (req, res) => {
  try {
    const result = await Favorite.deleteOne({
      article: req.params.articleId,
      user: (req as RequestWithUser).user._id,
    });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default FavoriteRouter;
