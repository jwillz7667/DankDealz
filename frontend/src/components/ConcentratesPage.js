import React from 'react';
import ProductList from './ProductList';

function ConcentratesPage() {
  return (
    <div className="concentrates-page">
      <h1>Concentrates</h1>
      <ProductList categorySlug="concentrates" />
    </div>
  );
}

export default ConcentratesPage;
