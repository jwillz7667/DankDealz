import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
    history.push('/cart');
  };

  const saveForLater = () => {
    // Implement save for later functionality
    console.log(`Saved ${product.name} for later`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details">
      <div className="image-gallery">
        <img src={product.images[currentImage]} alt={product.name} className="main-image" />
        <div className="thumbnail-container">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              className={`thumbnail ${currentImage === index ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="rating">Rating: {product.rating} ({product.numReviews} reviews)</p>
        <div className="description">
          <h2>Product Description</h2>
          <p>{product.description}</p>
          <h3>Strain Information</h3>
          <p>{product.strainInfo}</p>
          <h3>Effects</h3>
          <p>{product.effects}</p>
          <h3>THC/CBD Content</h3>
          <p>THC: {product.thcContent}% | CBD: {product.cbdContent}%</p>
        </div>
        <div className="lab-results">
          <h2>Lab Results</h2>
          <p>{product.labResults}</p>
        </div>
        <div className="quantity-selector">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={product.stockQuantity}
          />
        </div>
        <button onClick={addToCart} className="add-to-cart-btn">Add to Cart</button>
        <button onClick={saveForLater} className="save-for-later-btn">Save for Later</button>
      </div>
      <div className="reviews">
        <h2>Customer Reviews</h2>
        {product.reviews.map((review) => (
          <div key={review._id} className="review">
            <p className="reviewer-name">{review.name}</p>
            <p className="review-rating">Rating: {review.rating}</p>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="related-products">
        <h2>Related Products</h2>
        {/* Implement related products component here */}
      </div>
    </div>
  );
}

export default ProductDetails;
