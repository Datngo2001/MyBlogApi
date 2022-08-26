import Comment from "../models/comment.model";
import express from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";
import { CreateCommentDto, EditCommentDto } from "../dtos/comment.dtos";

const CommentRouter = express.Router();

CommentRouter.get("/:articleID", async (req, res) => {
  try {
    const comments = await Comment.find({
      article: req.params.articleID,
    })
      .sort({ createDate: "desc" })
      .populate("user");

    res.json(comments?.map((comment) => comment.toObject()));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

CommentRouter.post(
  "/",
  needloginMiddleware,
  validateMiddleware<CreateCommentDto>(),
  async (req, res) => {
    try {
      const comment = new Comment();
      comment?.$set({ user: (req as RequestWithUser).user._id });
      comment?.$set({ article: req.body.article });
      comment?.$set({ content: req.body.content });
      const result = await comment?.save();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

CommentRouter.put(
  "/:commentId",
  needloginMiddleware,
  validateMiddleware<EditCommentDto>(),
  async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      comment?.$set({ content: req.body.content });
      const result = await comment?.save();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

CommentRouter.delete("/:articleId", needloginMiddleware, async (req, res) => {
  try {
    const result = await Comment.findByIdAndDelete(req.params.articleId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default CommentRouter;
