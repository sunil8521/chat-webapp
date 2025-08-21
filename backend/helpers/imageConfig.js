import {v2 as imageUploader} from "cloudinary"
import multer from "multer"
import { v4 as uuid } from "uuid";
import "dotenv/config";
import {CustomError} from "../error/error.js"

const multerUpload = multer({ limits: { fileSize: 1024 * 1024 * 5 } });

export const uploadMultiple=multerUpload.single("avtar");


export const UploadToCloudnary = async (file) => {
    const filePromise = file.map((file) => {
  
      return new Promise((resolve, reject) => {
        
        imageUploader.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          // file.path,
          {
            folder:"chatApp",
            resource_type: "auto",
            // public_id: `${uuid()}_${file.mimetype}`,
            public_id: `${uuid()}`,
            // public_id: `${uuid()}_${file.mimetype.split("/")[1]}`,
          },
         (error, result)=>{
            if (error) {
              reject(error);
            } else {
              resolve(result );
            }
          }
        );
      });
    });
  
    try {
      const result  = await Promise.all(filePromise);
      return result;
    } catch (error) {
      throw new CustomError(error.message || "An error occurred while uploading files", 500);
    }
  };