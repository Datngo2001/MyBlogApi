import multer from "multer";
import express from "express";
import bucket from "../firebase/bucket";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import { RequestWithUser } from "interfaces/auth.interface";

const UploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// this code reference from https://viblo.asia/p/upload-files-len-firebase-cloud-storage-voi-vuejs-va-nodejs-bJzKmaNBK9N

UploadRouter.post(
  "/upload/",
  needloginMiddleware,
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("Error: No files found");
    }

    const blob = bucket.file((req as RequestWithUser).user._id);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err) => {
      console.log(err);
    });

    blobWriter.on("finish", (data: any) => {
      res.status(200).json(data);
    });

    blobWriter.end(req.file.buffer);
  }
);

export default UploadRouter;
