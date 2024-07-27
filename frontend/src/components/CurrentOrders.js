import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/current', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load current orders');
        setLoading(false);
      }
    };

    fetchCurrentOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="current-orders">
      <h3>Current Orders</h3>
      {orders.length === 0 ? (
        <p>No active orders</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order #{order.orderNumber}</p>
              <p>Status: {order.status}</p>
              <p>Estimated Delivery: {new Date(order.estimatedDeliveryTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurrentOrders;
