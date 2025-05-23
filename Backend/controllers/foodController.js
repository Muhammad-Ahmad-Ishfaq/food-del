import foodModel from '../models/foodModel.js';
import fs from 'fs';
import { uploadImageOnCloudinary, deleteImageOnCloudinary } from '../helper/cloudinaryHelper.js';


const addFoodController = async (req, res) => {
  try {
      const {name, description, price, category} = req.body;
      const picture = req.file?.fieldname;
      const picturePath = req.file?.path;
      if (
      !name ||
      !description ||
      !price ||
      !category ||
      !picture ||
      !picturePath
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "foods"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error while uploading image",
        error: secure_url,
      });
    }

    const newFood = await foodModel.create({
      name,
      description,
      price,
      category,
      picture: {
        secure_url,
        public_id,
      }
    })
    return res.status(201).send({
      success: true,
      message: "Picture uploaded successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in addFoodController",
      error,
    });
  }
};

const getAllFoodListController = async (req, res) => {
  try {
    const foodItems = await foodModel.find();
    res.status(200).send({ success: true, food: foodItems });
  } catch (error) {
    console.error('Error in getAllFoodListController:', error);
    res.status(500).send({ message: 'Server Error' });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const { foodId } = req.params;

    const food = await foodModel.findById(foodId);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    if (food.imagePublicId) {
      await deleteImageOnCloudinary(food.imagePublicId);
    }

    await foodModel.findByIdAndDelete(foodId);
    res.status(200).json({ success: true, message: "Food deleted successfully" });

  } catch (error) {
    console.error("Error in deleteFoodController:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export { addFoodController, getAllFoodListController, deleteFoodController };
