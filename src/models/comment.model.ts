import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  article: { type: Schema.Types.ObjectId, ref: "Article" },
  content: { type: String, require: true },
  createDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
