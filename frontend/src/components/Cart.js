import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage or state management solution
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
    const saved = JSON.parse(localStorage.getItem('savedItems')) || [];
    setSavedItems(saved);
  }, []);

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter(item => item._id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map(item => 
      item._id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const saveForLater = (id) => {
    const itemToSave = cartItems.find(item => item._id === id);
    const updatedCartItems = cartItems.filter(item => item._id !== id);
    const updatedSavedItems = [...savedItems, itemToSave];
    setCartItems(updatedCartItems);
    setSavedItems(updatedSavedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
  };

  const moveToCart = (id) => {
    const itemToMove = savedItems.find(item => item._id === id);
    const updatedSavedItems = savedItems.filter(item => item._id !== id);
    const updatedCartItems = [...cartItems, itemToMove];
    setCartItems(updatedCartItems);
    setSavedItems(updatedSavedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, e.target.value)}
                    min="1"
                  />
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
                <button onClick={() => saveForLater(item._id)}>Save for Later</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Estimated Tax: ${tax.toFixed(2)}</p>
            <h3>Total: ${total.toFixed(2)}</h3>
            <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
          </div>
        </>
      )}
      <Link to="/products" className="continue-shopping">Continue Shopping</Link>
      
      {savedItems.length > 0 && (
        <div className="saved-for-later">
          <h2>Saved for Later</h2>
          {savedItems.map((item) => (
            <div key={item._id} className="saved-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button onClick={() => moveToCart(item._id)}>Move to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
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
