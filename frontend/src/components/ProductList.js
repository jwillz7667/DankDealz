import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [thcContent, setThcContent] = useState([0, 100]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products`, {
          params: {
            keyword: searchTerm,
            category,
            sortBy,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            minThc: thcContent[0],
            maxThc: thcContent[1],
          }
        });
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, category, sortBy, priceRange, thcContent]);

  const addToCart = async (productId) => {
    try {
      await axios.post('/api/cart', { productId });
      // You might want to show a success message or update the cart count here
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="flower">Flower</option>
          <option value="edibles">Edibles</option>
          <option value="concentrates">Concentrates</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity">Sort by Popularity</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Sort by Rating</option>
        </select>
        <div className="range-filter">
          <label>Price Range:</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
          <span>${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <div className="range-filter">
          <label>THC Content (%):</label>
          <input
            type="range"
            min="0"
            max="100"
            value={thcContent[0]}
            onChange={(e) => setThcContent([Number(e.target.value), thcContent[1]])}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={thcContent[1]}
            onChange={(e) => setThcContent([thcContent[0], Number(e.target.value)])}
          />
          <span>{thcContent[0]}% - {thcContent[1]}%</span>
        </div>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/products/${product._id}`}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>THC: {product.thcContent}%</p>
            </Link>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
