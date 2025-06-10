import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place Order without Stripe
const placeOrder = async (req, res) => {
  try {
    // Get userId from authenticated token
    const userId = req.user.id || req.user._id;

    // Validate required fields
    const { items, amount, address, table, paymentMode, paymentDetails } =
      req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Items are required" });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Valid amount is required" });
    }
    if (!address || typeof address !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Valid address is required" });
    }
    if (!table || typeof table !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Table (order type) is required" });
    }

    // Create new order
    const newOrder = await orderModel.create({
      userId,
      items,
      amount,
      address,
      table,
      paymentMode, // ✅ Make sure this is passed and saved
      paymentDetails,
    });

    // Optionally clear user's cartData
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while placing order" });
  }
};
const verifyOrder = async (req, res) => {
  const { orderId, success, paymentMode } = req.body; // ✅ include paymentMode

  try {
    const isPaid = success === "true";
    if (isPaid) {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Paid",
        paymentMode, // ✅ Save the payment mode here
      });
      return res.send({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.send({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: "Error" });
  }
};
// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    return res.send({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: "Error" });
  }
};
// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    return res.send({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: "Error" });
  }
};
// api for updating order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status, paymentMode, paymentDetails } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      {
        status,
        paymentMode,
        paymentDetails,
      },
      { new: true }
    );

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
};

const paymentModeController = async (req, res) => {
  try {
    const { orderId, paymentMode } = req.body;

    if (!orderId || !paymentMode) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Order ID and payment mode are required",
        });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { paymentMode },
      { new: true }
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "Payment mode updated",
        order: updatedOrder,
      });
  } catch (error) {
    console.error("Error updating payment mode:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const paymentDetailController = async (req, res) => {
  try {
    const { orderId, paymentDetails } = req.body;

    if (!orderId || !paymentDetails) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Order ID and payment details are required",
        });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { paymentDetails },
      { new: true }
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "Payment details updated",
        order: updatedOrder,
      });
  } catch (error) {
    console.error("Error updating payment details:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const orderCountController = async (req, res) => {
  try {
    const totalProcessingOrPaid = await orderModel.countDocuments({
      status: { $in: ["Food Processing", "Paid"] },
    });

    const processingCount = await orderModel.countDocuments({
      status: "Food Processing",
    });

    const paidCount = await orderModel.countDocuments({
      status: "Paid",
    });

    return res.status(200).json({
      success: true,
      message: "Order counts fetched successfully",
      data: {
        totalProcessingOrPaid,
        processingCount,
        paidCount,
      },
    });
  } catch (error) {
    console.error("Error fetching order counts:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  paymentModeController,
  paymentDetailController,
  orderCountController,
};
