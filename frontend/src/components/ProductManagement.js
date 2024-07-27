import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/suppliers/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAvailabilityChange = async (productId, isAvailable) => {
    try {
      await axios.put(`/api/suppliers/products/${productId}`, 
        { isAvailable },
        { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
      );
      setProducts(products.map(product => 
        product._id === productId ? { ...product, isAvailable } : product
      ));
    } catch (error) {
      console.error('Failed to update product availability', error);
    }
  };

  const handleStockChange = async (productId, stockQuantity) => {
    try {
      await axios.put(`/api/suppliers/products/${productId}`, 
        { stockQuantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
      );
      setProducts(products.map(product => 
        product._id === productId ? { ...product, stockQuantity } : product
      ));
    } catch (error) {
      console.error('Failed to update stock quantity', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <Link to="/supplier/products/new" className="btn btn-primary">Add New Product</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>
                <input 
                  type="number" 
                  value={product.stockQuantity} 
                  onChange={(e) => handleStockChange(product._id, e.target.value)}
                />
              </td>
              <td>
                <input 
                  type="checkbox" 
                  checked={product.isAvailable} 
                  onChange={(e) => handleAvailabilityChange(product._id, e.target.checked)}
                />
              </td>
              <td>
                <Link to={`/supplier/products/${product._id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
