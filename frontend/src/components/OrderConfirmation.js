import React from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmation({ order }) {
  return (
    <div className="order-confirmation">
      <h2>Thank you for your order!</h2>
      <p>Your order has been successfully placed.</p>
      <div className="order-details">
        <h3>Order Details</h3>
        <p><strong>Order Number:</strong> {order.orderNumber}</p>
        <p><strong>Estimated Delivery Time:</strong> {order.estimatedDeliveryTime}</p>
        {/* Add more order details as needed */}
      </div>
      <div className="button-group">
        <Link to={`/track-order/${order.orderNumber}`} className="btn btn-primary">Track Order</Link>
        <Link to="/products" className="btn btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
