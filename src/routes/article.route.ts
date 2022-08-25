import Article from "../models/article.model";
import express from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { CreateArticleDto, UpdateArticleDto } from "../dtos/article.dtos";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const ArticleRouter = express.Router();

ArticleRouter.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit.toString());
    const skip = (parseInt(req.query.page.toString()) - 1) * limit;

    const query = Article.find({
      title: { $regex: req.query.title, $options: "i" },
    })
      .sort({ createDate: "desc" })
      .skip(skip)
      .limit(limit)
      .populate("author");

    const articles = await query;
    const count = await query.clone().count();

    res.json({
      articles: articles.map((article) => ({
        ...article?.toObject(),
      })),
      count: Math.round(count / limit) + 1,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ArticleRouter.get("by-author", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit.toString());
    const skip = (parseInt(req.query.page.toString()) - 1) * limit;

    const query = Article.find({
      author: req.query.author,
    })
      .sort({ createDate: "desc" })
      .skip(skip)
      .limit(limit)
      .populate("author");

    const articles = await query;
    const count = await query.clone().count();

    res.json({
      articles: articles.map((article) => article?.toObject()),
      count: Math.round(count / limit) + 1,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ArticleRouter.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("author");
    res.json(article?.toObject());
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ArticleRouter.post(
  "/",
  needloginMiddleware,
  validateMiddleware<CreateArticleDto>(),
  async (req, res) => {
    try {
      const article = new Article(req.body);
      article?.$set({ author: (req as RequestWithUser).user._id });
      const result = await article?.save();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

ArticleRouter.put(
  "/:id",
  needloginMiddleware,
  validateMiddleware<UpdateArticleDto>(),
  async (req, res) => {
    try {
      const article = await Article.findOne({
        _id: req.params.id,
        author: (req as RequestWithUser).user._id,
      });
      article?.$set(req.body);
      const result = await article?.save();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

ArticleRouter.delete(
  "/:id",
  needloginMiddleware,
  validateMiddleware<UpdateArticleDto>(),
  async (req, res) => {
    try {
      const result = await Article.deleteOne({
        _id: req.params.id,
        author: (req as RequestWithUser).user._id,
      });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default ArticleRouter;
