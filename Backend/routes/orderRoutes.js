import express from 'express'
import { listOrders, orderCountController, paymentDetailController, paymentModeController, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';




const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.post("/payment-mode", paymentModeController);
orderRouter.post("/payment-details", paymentDetailController);
orderRouter.get("/counts", orderCountController);

export default orderRouter;