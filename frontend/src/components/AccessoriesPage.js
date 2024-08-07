import React from 'react';
import ProductList from './ProductList';

function AccessoriesPage() {
  return (
    <div className="accessories-page">
      <h1>Accessories</h1>
      <ProductList categorySlug="accessories" />
    </div>
  );
}

export default AccessoriesPage;
