import React from 'react';

function Navbar({ cartCount, onNavigate, currentPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('home')}>
        <span className="brand-icon">🛒</span>
        <span className="brand-name">YOUR SOUL CART</span>
      </div>
      <div className="navbar-links">
        <button
          className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          Home
        </button>
        <button
          className={`nav-btn cart-btn ${currentPage === 'cart' ? 'active' : ''}`}
          onClick={() => onNavigate('cart')}
        >
          Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
