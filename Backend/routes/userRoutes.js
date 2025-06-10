import express from 'express'
import { getAllUserController, getCurrentUser, loginUser, registerUser } from '../controllers/userController.js';




const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)
userRouter.get('/me', getCurrentUser);
userRouter.get('/all-users', getAllUserController);

export default userRouter;