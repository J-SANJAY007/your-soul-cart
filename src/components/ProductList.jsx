import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart, onBuyNow }) {
  return (
    <section className="product-list">
      <h2 className="section-title">Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
