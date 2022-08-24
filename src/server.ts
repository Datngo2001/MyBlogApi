import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { CLIENT_URL, DATABASE_URL, PORT } from "./config";
import UserRouter from "./routes/user.route";
import AuthRouter from "./routes/auth.route";
import UploadRouter from "./routes/upload.route";
import authenMiddleware from "./middlewares/authen.middleware";
import ArticleRouter from "./routes/article.route";

mongoose.connect(DATABASE_URL);
const database = mongoose.connection;
database.on("error", (error) => console.log(error));
database.once("open", () => console.log("Connected to database"));

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(authenMiddleware);

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/upload", UploadRouter);
app.use("/article", ArticleRouter);

app.listen(PORT, () => {
  console.log("Server started");
});
