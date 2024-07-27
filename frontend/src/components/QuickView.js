import React from 'react';
import { Link } from 'react-router-dom';
import './QuickView.css';

function QuickView({ product, onClose, addToCart }) {
  return (
    <div className="quick-view-overlay">
      <div className="quick-view-modal">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="quick-view-content">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="price">${product.price}</p>
            <p className="rating">Rating: {product.rating}</p>
            <p className="thc-content">THC: {product.thcContent}%</p>
            <p className="description">{product.description}</p>
            <div className="actions">
              <button onClick={() => addToCart(product._id)}>Add to Cart</button>
              <Link to={`/products/${product._id}`}>View Full Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;
