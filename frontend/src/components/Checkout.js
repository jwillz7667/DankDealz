import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

function Checkout() {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error(error);
        return;
      }

      try {
        const { data } = await axios.post('/api/payment/process', {
          amount: 1000, // Replace with actual order total
          paymentMethodId: paymentMethod.id,
        });

        // Handle successful payment
        console.log('Payment successful', data);
        history.push('/order-confirmation');
      } catch (error) {
        console.error('Payment failed', error);
      }
    } else {
      // Handle other payment methods
      console.log('Processing payment with', paymentMethod);
      history.push('/order-confirmation');
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Delivery Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="applepay">Apple Pay</option>
          </select>
        </div>
        {paymentMethod === 'card' && (
          <div>
            <CardElement />
          </div>
        )}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
