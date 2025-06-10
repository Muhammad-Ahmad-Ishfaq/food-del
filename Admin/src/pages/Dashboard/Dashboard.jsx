import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [counts, setCounts] = useState({
    totalProcessingOrPaid: 0,
    processingCount: 0,
    paidCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/order/counts");
        if (data.success) {
          setCounts(data.data);
        }
      } catch (error) {
        console.error("Error fetching order counts", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="p-8 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders (Processing or Paid)</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{counts.totalProcessingOrPaid}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Processing Orders</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{counts.processingCount}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Paid Orders</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{counts.paidCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
