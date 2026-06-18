import React from 'react';

function ProductCard({ product, onAddToCart, onBuyNow }) {
  return (
    <div className="product-card">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <p className="product-price">
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        <div className="product-actions">
          <button
            className="btn btn-add-cart"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>

          <button
            className="btn btn-buy-now"
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;