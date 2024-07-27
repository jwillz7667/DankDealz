import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function AnalyticsDashboard() {
  const [salesData, setSalesData] = useState(null);
  const [productPerformance, setProductPerformance] = useState(null);
  const [customerFeedback, setCustomerFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await axios.get('/api/suppliers/analytics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setSalesData(data.salesData);
        setProductPerformance(data.productPerformance);
        setCustomerFeedback(data.customerFeedback);
        setLoading(false);
      } catch (error) {
        setError('Failed to load analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="analytics-dashboard">
      <h2>Analytics Dashboard</h2>
      
      <div className="sales-trends">
        <h3>Sales Trends</h3>
        {salesData && (
          <Line
            data={salesData}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        )}
      </div>

      <div className="product-performance">
        <h3>Product Performance</h3>
        {productPerformance && (
          <Bar
            data={productPerformance}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        )}
      </div>

      <div className="customer-feedback">
        <h3>Customer Feedback Summary</h3>
        {customerFeedback && (
          <ul>
            {customerFeedback.map((feedback, index) => (
              <li key={index}>
                <p><strong>Product:</strong> {feedback.productName}</p>
                <p><strong>Average Rating:</strong> {feedback.averageRating}</p>
                <p><strong>Total Reviews:</strong> {feedback.totalReviews}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
