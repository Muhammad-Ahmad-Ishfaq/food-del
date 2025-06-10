import express from 'express';
import { addFoodController, deleteFoodController, getAllFoodListController } from '../controllers/foodController.js';
import { upload } from '../middleware/multerMiddleware.js';

const foodRouter = express.Router();

// Routes
foodRouter.post('/add', upload.single('picture'), addFoodController);
foodRouter.get('/list', getAllFoodListController);
foodRouter.delete('/:foodId', deleteFoodController);

export default foodRouter;
