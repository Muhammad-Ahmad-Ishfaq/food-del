import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllData();
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className='order add p-16'>
      <h2 className='text-2xl font-semibold'>Order Page</h2>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="Order Icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, i) =>
                  `${item.name}x${item.quantity}${i < order.items.length - 1 ? ', ' : ''}`
                )}
              </p>

              {/* Dine-in Attributes */}
              <p className='order-item-name'>Table No: {order.table || 'N/A'}</p>
              <p className='order-item-name'>Payment Mode: {order.paymentMode || 'N/A'}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>

            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Deliverd">Deliverd</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
