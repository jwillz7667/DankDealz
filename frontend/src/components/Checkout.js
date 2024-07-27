import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

function Checkout() {
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service');
      return;
    }

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
          address,
          deliveryTime,
          promoCode
        });

        // Handle successful payment
        console.log('Payment successful', data);
        history.push({
          pathname: '/order-confirmation',
          state: { order: data.order }
        });
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
          <label htmlFor="deliveryTime">Delivery Time:</label>
          <select
            id="deliveryTime"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            required
          >
            <option value="">Select a delivery time</option>
            <option value="asap">As soon as possible</option>
            <option value="1hour">Within 1 hour</option>
            <option value="2hours">Within 2 hours</option>
            <option value="3hours">Within 3 hours</option>
          </select>
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
        <div>
          <label htmlFor="promoCode">Promo Code:</label>
          <input
            type="text"
            id="promoCode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          </label>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          {/* Add order summary details here */}
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
