import React from 'react';
import ProductList from './ProductList';

function VapesPage() {
  return (
    <div className="vapes-page">
      <h1>Vapes</h1>
      <ProductList categorySlug="vapes" />
    </div>
  );
}

export default VapesPage;
