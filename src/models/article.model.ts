import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  thumbnail: { type: String, require: false },
  title: { type: String, require: true },
  subtitle: { type: String, require: true },
  content: { type: String, require: true },
  createDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
