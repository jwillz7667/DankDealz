import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating} ({product.numReviews} reviews)</p>
      <div>
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
      <button onClick={addToCart}>Add to Cart</button>
      <h2>Reviews</h2>
      {product.reviews.map((review) => (
        <div key={review._id} className="review">
          <p>{review.name}</p>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductDetails;
