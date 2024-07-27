import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/suppliers/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/suppliers/orders/${orderId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
      );
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderNumber}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.user.name}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <Link to={`/supplier/orders/${order._id}`}>View Details</Link>
                <select 
                  value={order.status} 
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
