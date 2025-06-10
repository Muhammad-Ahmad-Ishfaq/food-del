import React from "react";
import { Link, useLocation } from "react-router-dom";

function CreateBill() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <p>No order data available</p>;
  }

  const { items, amount, table, _id: orderId } = order;

  return (
    <div className="p-16">
      <h2 className="text-2xl font-semibold mb-4">Bill Summary</h2>
      <div className="bill-details">
        <p><strong>Order Type:</strong> {table.startsWith("Table") ? "Dine-In" : "N/A"}</p>
        <table className="bill-table w-full border mt-4">
          <thead>
            <tr className="border-b">
              <th className="p-2">Item</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b text-center">
                <td className="p-2">{item.name}</td>
                <td className="p-2">${item.price}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-right">
          <p><strong>Subtotal:</strong> ${amount}</p>
          <hr />
          <p><strong>Tax + Service:</strong> $2</p>
          <hr />
          <h3 className="text-xl font-bold">Total: ${amount + 2}</h3>
        </div>

        <Link to='/paymentMode' state={{ orderId }}>
          <button className="mt-4 bg-[tomato] text-white px-4 py-2 rounded hover:bg-orange-700">
            Proceed to Payment
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CreateBill;
