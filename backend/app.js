await db.updatePaymentStatus(paymentId, 'submitted');
global.updatePaymentStatus(paymentId, 'submitted');
import { Server } from 'socket.io';

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Emit payment status updates
  const updatePaymentStatus = (paymentId, status) => {
    io.emit('paymentStatusUpdate', { paymentId, status });
  };

  global.updatePaymentStatus = updatePaymentStatus; // Make it globally accessible
});// backend/app.js
import express from 'express';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
