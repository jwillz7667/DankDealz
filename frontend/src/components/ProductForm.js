import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    isAvailable: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`/api/suppliers/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
          });
          setProduct(data);
        } catch (error) {
          setError('Failed to load product');
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (id) {
        await axios.put(`/api/suppliers/products/${id}`, product, {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
      } else {
        await axios.post('/api/suppliers/products', product, {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
      }
      navigate('/supplier/products');
    } catch (error) {
      setError('Failed to save product');
    }
    setLoading(false);
  };

  return (
    <div className="product-form">
      <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="flower">Flower</option>
            <option value="edibles">Edibles</option>
            <option value="concentrates">Concentrates</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label htmlFor="stockQuantity">Stock Quantity:</label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="isAvailable">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={product.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
