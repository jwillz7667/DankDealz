import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setOrder(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details">
      <h2>Order #{order.orderNumber}</h2>
      
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
        <p>Total: ${order.totalPrice.toFixed(2)}</p>
        <p>Status: {order.status}</p>
      </div>

      <div className="status-timeline">
        <h3>Status Timeline</h3>
        <ul>
          {order.statusUpdates.map((update, index) => (
            <li key={index}>
              {update.status}: {new Date(update.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {order.driver && (
        <div className="driver-info">
          <h3>Driver Information</h3>
          <p>Name: {order.driver.name}</p>
          <p>Phone: {order.driver.phone}</p>
        </div>
      )}

      <div className="delivery-tracking">
        <h3>Delivery Tracking</h3>
        <MapContainer center={[order.deliveryLocation.lat, order.deliveryLocation.lng]} zoom={13} style={{ height: '300px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[order.deliveryLocation.lat, order.deliveryLocation.lng]}>
            <Popup>Delivery Location</Popup>
          </Marker>
          {order.driver && (
            <Marker position={[order.driver.location.lat, order.driver.location.lng]}>
              <Popup>Driver Location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <Link to="/contact-support" className="btn btn-primary">Contact Support</Link>
    </div>
  );
}

export default OrderDetails;
