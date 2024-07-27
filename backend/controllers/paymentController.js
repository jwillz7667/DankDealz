const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Process payment
// @route   POST /api/payment/process
// @access  Private
const processPayment = async (req, res) => {
  const { amount, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { processPayment };
