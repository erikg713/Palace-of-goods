import express from 'express';
import { register, login } from '../controllers/authController';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
import { authenticate } from './controllers/authController';

router.post('/create-payment', authenticate, validatePaymentData, asyncHandler(async (req, res) => {
  const { userUid, amount, memo, productId } = req.body;
  ...
}));
