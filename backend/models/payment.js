// models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  productId: { type: String, required: true },
  amount: { type: Number, required: true },
  memo: { type: String, required: true },
  paymentId: { type: String, required: true },
  txid: { type: String, default: null },
  status: { type: String, default: 'created' }
});

module.exports = mongoose.model('Payment', paymentSchema);
