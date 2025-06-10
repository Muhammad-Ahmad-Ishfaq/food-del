import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Food Processing",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentMode: {
    type: String,
    default: "N/A", // e.g., "Cash", "JazzCash", "Debit Card", "Online"
  },
  paymentDetails: {
    type: Object, // allows storing different data types/structures
    default: {},
  },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
