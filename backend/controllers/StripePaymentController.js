const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a Payment Intent
exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // The amount should be in the smallest currency unit (e.g., cents)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: 'Payment failed' });
  }
};
