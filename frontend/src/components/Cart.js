import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, removeItem } from '../slices/cartSlice';
import axios from 'axios';
import Loading from './Loading';
import CartItem from './CartItem';

function Cart() {
  const dispatch = useDispatch();
  const { items, total, loading, error } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`/api/cart/${itemId}`, { quantity: newQuantity }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
      });
      dispatch(fetchCart());
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items.map(item => (
        <CartItem
          key={item._id}
          item={item}
          updateQuantity={updateQuantity}
          removeItem={handleRemoveItem}
        />
      ))}
      <div className="cart-total">
        <h3>Total: ${total}</h3>
      </div>
      <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;
