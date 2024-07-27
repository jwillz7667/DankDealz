import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage or state management solution
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
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

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, e.target.value)}
                  min="1"
                />
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
            <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
