// utils/new-cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// --- ADD THIS CONFIGURATION BLOCK ---

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ------------------------------------

export const uploads = (file, public_id, overwrite, invalidate) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      // Note: `v2` is already aliased to `cloudinary`
      file,
      {
        public_id,
        overwrite,
        invalidate,
        resource_type: "auto", // zip, images
      },
      (error, result) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
};

export const videoUpload = (file, public_id, overwrite, invalidate) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      // Note: `v2` is already aliased to `cloudinary`
      file,
      {
        public_id,
        overwrite,
        invalidate,
        chunk_size: 50000,
        resource_type: "video",
      },
      (error, result) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
};
