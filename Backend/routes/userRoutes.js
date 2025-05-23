import express from 'express'
import { getCurrentUser, loginUser, registerUser } from '../controllers/userController.js';




const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)
userRouter.get('/me', getCurrentUser);

export default userRouter;