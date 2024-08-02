import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('/api/cart');
      setCart(data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'There was an issue fetching your cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    setUpdating(true);
    try {
      await axios.put(`/api/cart/${itemId}`, { quantity: newQuantity });
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.map(item =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      }));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update quantity. Please try again later.');
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      setCart(prevCart => {
        const updatedItems = prevCart.items.filter(item => item._id !== itemId);
        return { ...prevCart, items: updatedItems };
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to remove item. Please try again later.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <CartItem
          key={item._id}
          item={item}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      ))}
      <div className="cart-total">
        <h3>Total: ${cart.total}</h3>
      </div>
      <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;
