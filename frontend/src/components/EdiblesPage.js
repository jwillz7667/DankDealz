import React from 'react';
import ProductList from './ProductList';

function EdiblesPage() {
  return (
    <div className="edibles-page">
      <h1>Edibles</h1>
      <ProductList categorySlug="edibles" />
    </div>
  );
}

export default EdiblesPage;
