import React from 'react';
import Payment from './components/Payment';

function App() {
  return (
    <div>
      <h1>Palace of Goods</h1>
      <Payment />
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';

const PaymentUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    socket.on('paymentStatusUpdate', (data) => {
      setUpdates((prev) => [...prev, data]);
    });

    return () => socket.off('paymentStatusUpdate');
  }, []);

  return (
    <div>
      <h2>Payment Updates</h2>
      <ul>
        {updates.map((update, idx) => (
          <li key={idx}>
            Payment ID: {update.paymentId}, Status: {update.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentUpdates;
