import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Cart() {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    role,
  } = useContext(StoreContext);

  const [orderType, setOrderType] = useState("");
  const [table, setTable] = useState("");

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first");
    return;
  }

  if (!orderType) {
    toast.error("Please select order type");
    return;
  }

  if (orderType === "dine-in" && !table) {
    toast.error("Please select a table");
    return;
  }

  const items = food_list
    .filter((item) => cartItems[item._id] > 0)
    .map((item) => ({
      name: item.name,
      price: item.price,
      quantity: cartItems[item._id],
    }));

  const data = {
    items,
    amount: getTotalCartAmount(),
    address:
      orderType === "parcel"
        ? "Parcel Order"
        : orderType === "delivery"
        ? "Delivery Order"
        : "Table Order",
    table: orderType === "dine-in" ? table : orderType,
  };

  try {
    const response = await axios.post(`${url}/api/order/place`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      toast.success("Order placed successfully!");
      if (orderType === "parcel") {
        window.location.href = response.data.session_url;
      } else {
        navigate("/myorders");
      }
    } else {
      toast.error("Order failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error");
  }
};

useEffect(() => {
  if (role !== 1) {
    setOrderType("dine-in"); // auto-set for normal users
  }
}, [role]);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((food) => {
          if (cartItems[food._id] > 0) {
            return (
              <div key={food._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={food.picture.secure_url} alt="" />
                  <p>{food.name}</p>
                  <p>${food.price}</p>
                  <p>{cartItems[food._id]}</p>
                  <p>${food.price * cartItems[food._id]}</p>
                  <p onClick={() => removeFromCart(food._id)} className="cross">
                    Delete
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2 className="text-2xl font-semibold mt-16">Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          {/* Order Type Selection */}
          <div className="mt-4">
  <label className="font-medium">Order Type:</label>
  {role === 1 ? (
    // Admin: Can choose from all options
    <select
      className="border p-2 w-full mt-2"
      value={orderType}
      onChange={(e) => setOrderType(e.target.value)}
    >
      <option value="">-- Choose --</option>
      <option value="dine-in">Dine-In</option>
      <option value="delivery">Delivery</option>
      <option value="parcel">Parcel</option>
    </select>
  ) : (
    // Normal user: Fixed to Dine-In
    <input
      type="text"
      value="Dine-In"
      disabled
      className="border p-2 w-full mt-2 bg-gray-100 cursor-not-allowed"
    />
  )}
</div>


          {/* Table selection for dine-in */}
          {orderType === "dine-in" && (
            <div className="mt-4">
              <label className="font-medium">Select Table:</label>
              <select
                name="table"
                value={table}
                onChange={(e) => setTable(e.target.value)}
                className="border p-2 w-full mt-2"
              >
                <option value="">--Select Table--</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i} value={`Table${i + 1}`}>
                    Table{i + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {orderType === "dine-in" && (
  <button
    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
    onClick={handlePlaceOrder}
  >
    Place Order
  </button>
)}

{orderType === "parcel" && (
  <button
    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
    onClick={handlePlaceOrder}
  >
    Proceed to Checkout
  </button>
)}

{orderType === "delivery" && (
  <button
    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
    onClick={() => navigate("/order")}
  >
    Proceed to Checkout
  </button>
)}

        </div>

        {/* Promo Code */}
        <div className="cart-promocode">
          <div className="mt-16">
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
