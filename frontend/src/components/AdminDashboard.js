import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));
      
    axios.get('http://localhost:5000/api/profit')
      .then(response => setProfit(response.data.profit))
      .catch(error => console.error("Error fetching profit:", error));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Profit: {profit} Pi</p>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>Order {order.id} - {order.amount} Pi</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
