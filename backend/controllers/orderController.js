const Order = require('../models/order');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
  const { userId, products } = req.body;
  try {
    // Calculate total amount
    let totalAmount = 0;
    for (const productId of products) {
      const product = await Product.findById(productId);
      totalAmount += product.price;
    }
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};
