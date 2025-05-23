import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header like "Bearer <token>"

  if (!token) {
    return res.status(401).send({ success: false, message: "Not Authorized. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    req.user = user;
    req.body.userId = user._id;

    if (req.body.orderType === 'dine-in' && user.role !== 1) {
      return res.status(403).send({ success: false, message: "Only admin can place dine-in orders" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).send({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
