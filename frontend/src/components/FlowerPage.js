import React from 'react';
import ProductList from './ProductList';

function FlowerPage() {
  return (
    <div className="flower-page">
      <h1>Flower</h1>
      <ProductList categorySlug="flower" />
    </div>
  );
}

export default FlowerPage;
