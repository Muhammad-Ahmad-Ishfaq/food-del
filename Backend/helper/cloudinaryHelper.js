import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv'

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Failed to delete local file:", err);
    }
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const deleteImageOnCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    throw new Error(error)
  }
}
export  { uploadImageOnCloudinary, deleteImageOnCloudinary }



