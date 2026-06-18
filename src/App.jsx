import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { products } from './data/products';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [orderSuccess, setOrderSuccess] = useState(null);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const buyNow = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCurrentPage('checkout');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const placeOrder = (orderData) => {
    setOrderSuccess(orderData);
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const navigate = (page) => {
    setCurrentPage(page);
    if (page === 'home' && orderSuccess) {
      setOrderSuccess(null);
    }
  };

  if (orderSuccess) {
    return (
      <div className="app">
        <Navbar cartCount={0} onNavigate={navigate} currentPage="home" />
        <main className="main-content">
          <section className="success-page">
            <div className="success-card">
              <div className="success-icon">🎉</div>
              <h2>Order Placed Successfully!</h2>
              <p className="success-message">
                Thank You For Shopping With YOUR SOUL CART
              </p>
              <div className="success-details">
                <p><strong>Name:</strong> {orderSuccess.customer.fullName}</p>
                <p><strong>Phone:</strong> {orderSuccess.customer.phone}</p>
                <p><strong>Address:</strong> {orderSuccess.customer.addressLine1}
                  {orderSuccess.customer.addressLine2 && `, ${orderSuccess.customer.addressLine2}`}, {orderSuccess.customer.city}, {orderSuccess.customer.state} - {orderSuccess.customer.pincode}
                </p>
                <p><strong>Total Amount:</strong> ₹{orderSuccess.totalPrice.toLocaleString('en-IN')}</p>
                <p><strong>Payment Method:</strong>{' '}
                  {orderSuccess.paymentMethod === 'cod' && 'Cash On Delivery'}
                  {orderSuccess.paymentMethod === 'upi' && 'UPI'}
                  {orderSuccess.paymentMethod === 'credit' && 'Credit Card'}
                  {orderSuccess.paymentMethod === 'debit' && 'Debit Card'}
                </p>
              </div>
              <button className="btn btn-primary" onClick={() => navigate('home')}>
                Continue Shopping
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar cartCount={getCartCount()} onNavigate={navigate} currentPage={currentPage} />
      <main className="main-content">
        {currentPage === 'home' && (
          <ProductList
            products={products}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        )}
        {currentPage === 'cart' && (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onCheckout={() => setCurrentPage('checkout')}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'checkout' && (
          <Checkout
            cartItems={cartItems}
            onPlaceOrder={placeOrder}
            onNavigate={navigate}
          />
        )}
      </main>
    </div>
  );
}

export default App;
