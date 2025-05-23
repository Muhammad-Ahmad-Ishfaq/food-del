import userModel from '../models/userModel.js'

// Add item in cart
const addToCart = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const userId = req.user._id; // ✅ secure way

    if (!itemId) {
      return res.status(400).send({ success: false, message: "Missing itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.send({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};
// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId); // Fixed

        if (!userData) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData;

        const itemId = req.body.itemId;

        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]; // Optional: Remove item if quantity is 0
            }

            await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData } });

            return res.send({ success: true, message: "Removed from cart" });
        } else {
            return res.status(400).send({ success: false, message: "Item not in cart" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Error" });
    }
}

// Get items
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const freshUser = await userModel.findById(userId);

    if (!freshUser) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    return res.send({ success: true, cartData: freshUser.cartData || {} });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Failed to load cart" });
  }
};export { addToCart, removeFromCart, getCart }