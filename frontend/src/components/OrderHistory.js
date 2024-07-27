import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const { data } = await axios.get('/api/orders/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load order history');
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleReorder = async (orderId) => {
    try {
      await axios.post(`/api/orders/reorder/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      });
      // Optionally, you can update the UI or redirect the user to the cart
      alert('Items added to cart successfully');
    } catch (error) {
      alert('Failed to reorder. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-history">
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>No past orders</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order #{order.orderNumber}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.totalPrice.toFixed(2)}</p>
              <button onClick={() => handleReorder(order._id)}>Reorder</button>
              <Link to={`/order/${order._id}`}>View Details</Link>
              {order.isDelivered && !order.isRated && (
                <Link to={`/rate-order/${order._id}`}>Rate and Review</Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;
