import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

function MyOrders() {
  const { url, token, clearCart  } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [paidOrderTimeouts, setPaidOrderTimeouts] = useState({});
  const location = useLocation();

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `${url}/api/order/userorders`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const fetchedOrders = response.data.orders;

        // Handle newly paid orders to start 10s timers
        fetchedOrders.forEach((order) => {
          if (order.status === "Paid" && !paidOrderTimeouts[order._id]) {
            const timeout = setTimeout(() => {
              setData((prev) => prev.filter((o) => o._id !== order._id));
              localStorage.removeItem("userId");
              setPaidOrderTimeouts((prev) => {
                const newTimeouts = { ...prev };
                delete newTimeouts[order._id];
                return newTimeouts;
              });
            }, 1000); // 1 seconds

            setPaidOrderTimeouts((prev) => ({ ...prev, [order._id]: timeout }));
          }
        });

        setData(fetchedOrders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while fetching orders");
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [token, location]);

  useEffect(() => {
    return () => {
      // Clear all timers on unmount
      Object.values(paidOrderTimeouts).forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="my-orders pt-16 w-full">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      <div className="my-orders-grid">
        {data?.map((order, index) => {
          const isDineIn = order.table?.startsWith("Table");
          const isDelivery = order.table === "delivery";
          const isParcel = order.table === "parcel";

          return (
            <div
              key={order._id || index}
              className="my-orders-order border rounded shadow bg-white"
            >
              <img
                src={assets.parcel_icon}
                alt="order"
                className="order-icon"
              />

              <p className="mb-1 font-medium">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              <p>
                Amount: <strong>${order.amount}.00</strong>
              </p>
              <p>Items: {order.items.length}</p>
              <p>
                <strong>Payment Mode:</strong>{" "}
                {order.paymentMode ? order.paymentMode : "N/A"}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {isDineIn
                  ? "Dine-In"
                  : isDelivery
                  ? "Delivery"
                  : isParcel
                  ? "Parcel"
                  : "Unknown"}
              </p>

              {isDineIn && (
                <p>
                  <strong>Table No:</strong> {order.table}
                </p>
              )}

              <p className="order-status">
                <span
                  className={`status-dot ${
                    order.status === "Paid" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></span>
                <strong>{order.status}</strong>
              </p>

              <div className="order-buttons">
                <button onClick={fetchData}>Track Order</button>
                <Link to="/bill" state={{ order }}>
                  <button
                    className="bg-green-600"
                    onClick={() => {
                      clearCart(); // ✅ Clear the cart
                    }}
                  >
                    Take Bill
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;
