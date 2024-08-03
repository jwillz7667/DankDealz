import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductPreview.css';

// This is a mock function to get product details. In a real app, you'd fetch this from an API.
const getProductDetails = (id) => {
  const mockProducts = [
    { _id: '1', name: 'OG Kush', price: 35.99, rating: 4.5, numReviews: 120, image: '/images/og-kush.jpg', category: 'Flower', thcContent: 22, description: 'A classic OG strain known for its potent effects and earthy pine aroma.' },
    { _id: '2', name: 'Blue Dream', price: 32.99, rating: 4.3, numReviews: 98, image: '/images/blue-dream.jpg', category: 'Flower', thcContent: 18, description: 'A sativa-dominant hybrid with a sweet berry aroma and balanced full-body effects.' },
    { _id: '3', name: 'Sour Diesel', price: 37.99, rating: 4.7, numReviews: 150, image: '/images/sour-diesel.jpg', category: 'Flower', thcContent: 25, description: 'A fast-acting strain delivering energizing, dreamy cerebral effects.' },
    { _id: '4', name: 'Girl Scout Cookies', price: 39.99, rating: 4.8, numReviews: 200, image: '/images/gsc.jpg', category: 'Flower', thcContent: 28, description: 'A popular strain known for its sweet and earthy aroma and powerful full-body high.' },
    { _id: '5', name: 'Gelato', price: 36.99, rating: 4.6, numReviews: 180, image: '/images/gelato.jpg', category: 'Flower', thcContent: 20, description: 'A hybrid strain with a sweet and creamy flavor profile and balanced effects.' },
  ];
  return mockProducts.find(product => product._id === id);
};

function ProductPreview() {
  const { id } = useParams();
  const product = getProductDetails(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-preview">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>
        <p className="rating">★ {product.rating} ({product.numReviews} reviews)</p>
        <p className="category">{product.category}</p>
        <p className="thc">THC: {product.thcContent}%</p>
        <p className="description">{product.description}</p>
        <div className="actions">
          <button className="add-to-cart">Add to Cart</button>
          <Link to={`/products/${product._id}`} className="view-full-details">View Full Details</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
