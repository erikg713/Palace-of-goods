import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import paymentsRouter from './routes/payments';
import { db } from './config/db'; // Import your DB config if needed

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Use the payments route
app.use('/api/payments', paymentsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
