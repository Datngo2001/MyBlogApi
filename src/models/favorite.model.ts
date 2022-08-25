import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  article: { type: Schema.Types.ObjectId, ref: "Article" },
  createDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
