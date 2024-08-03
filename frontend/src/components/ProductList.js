import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import axios from 'axios';
import './ProductList.css';
import QuickView from './QuickView';
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    sortBy: 'popularity',
    priceRange: [0, 1000],
    thcContent: [0, 100],
  });
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, url: '/api/products' }));
  }, [dispatch, filters]);

  const addToCart = async (productId) => {
    try {
      await axios.post('/api/cart', { productId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
      });
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      <h1>Products</h1>
      <ProductFilters filters={filters} setFilters={setFilters} viewMode={viewMode} setViewMode={setViewMode} />
      <div className={`products-${viewMode}`}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            viewMode={viewMode}
            openQuickView={openQuickView}
            addToCart={addToCart}
          />
        ))}
      </div>
      {quickViewProduct && (
        <QuickView product={quickViewProduct} onClose={closeQuickView} addToCart={addToCart} />
      )}
    </div>
  );
}

export default ProductList;
