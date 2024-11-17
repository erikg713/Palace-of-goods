import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await axios.get('/api/orders');
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h3>Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id} - Status: {order.orderStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
