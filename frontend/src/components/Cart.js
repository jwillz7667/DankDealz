import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('/api/cart');
        setCart(data);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`/api/cart/${itemId}`, { quantity: newQuantity });
      const updatedCart = { ...cart };
      const itemIndex = updatedCart.items.findIndex(item => item._id === itemId);
      updatedCart.items[itemIndex].quantity = newQuantity;
      setCart(updatedCart);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      const updatedCart = { ...cart };
      updatedCart.items = updatedCart.items.filter(item => item._id !== itemId);
      setCart(updatedCart);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to remove item');
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <div key={item._id} className="cart-item">
          <img src={item.product.image} alt={item.product.name} />
          <div>
            <h3>{item.product.name}</h3>
            <p>Price: ${item.product.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
              min="1"
            />
            <button onClick={() => removeItem(item._id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${cart.total}</h3>
      </div>
      <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('/api/cart');
        setCart(data);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`/api/cart/${itemId}`, { quantity: newQuantity });
      const updatedCart = { ...cart };
      const itemIndex = updatedCart.items.findIndex(item => item._id === itemId);
      updatedCart.items[itemIndex].quantity = newQuantity;
      setCart(updatedCart);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      const updatedCart = { ...cart };
      updatedCart.items = updatedCart.items.filter(item => item._id !== itemId);
      setCart(updatedCart);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to remove item');
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <div key={item._id} className="cart-item">
          <img src={item.product.image} alt={item.product.name} />
          <div>
            <h3>{item.product.name}</h3>
            <p>Price: ${item.product.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
              min="1"
            />
            <button onClick={() => removeItem(item._id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${cart.total}</h3>
      </div>
      <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;
