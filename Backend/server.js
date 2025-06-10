import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import morgan from 'morgan';
import userRouter from './routes/userRoutes.js';
import dotenv from 'dotenv'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000

// ✅ CORS FIXED HERE — no slash at the end, and extra config added

const allowedOrigins = ['https://food-del-frontend-ruddy.vercel.app', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'] // ✅ Add 'token' here
}));
app.use(morgan("dev"));
app.use(express.json())

connectDB();

// Routes
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API working");
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
