import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SupplierDashboard() {
  const [dashboardData, setDashboardData] = useState({
    sales: 0,
    revenue: 0,
    popularProducts: [],
    pendingOrders: [],
    lowStockAlerts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get('/api/suppliers/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="supplier-dashboard">
      <h2>Supplier Dashboard</h2>
      
      <div className="overview">
        <h3>Overview</h3>
        <p>Total Sales: {dashboardData.sales}</p>
        <p>Total Revenue: ${dashboardData.revenue.toFixed(2)}</p>
      </div>

      <div className="popular-products">
        <h3>Popular Products</h3>
        <ul>
          {dashboardData.popularProducts.map(product => (
            <li key={product._id}>
              {product.name} - Sold: {product.soldCount}
            </li>
          ))}
        </ul>
      </div>

      <div className="pending-orders">
        <h3>Pending Orders</h3>
        <ul>
          {dashboardData.pendingOrders.map(order => (
            <li key={order._id}>
              Order #{order.orderNumber} - ${order.totalPrice.toFixed(2)}
              <Link to={`/supplier/orders/${order._id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="low-stock-alerts">
        <h3>Low Stock Alerts</h3>
        <ul>
          {dashboardData.lowStockAlerts.map(product => (
            <li key={product._id}>
              {product.name} - Current Stock: {product.stockQuantity}
              <Link to={`/supplier/products/${product._id}/edit`}>Update Stock</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="manage-products">
        <h3>Manage Products</h3>
        <Link to="/supplier/products" className="btn btn-primary">View All Products</Link>
      </div>
    </div>
  );
}

export default SupplierDashboard;
