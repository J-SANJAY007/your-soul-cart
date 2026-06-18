import React from 'react';

function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  onNavigate
}) {

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h2 className="section-title">Shopping Cart</h2>

        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>

          <p>Your cart is empty</p>

          <button
            className="btn btn-primary"
            onClick={() => onNavigate('home')}
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2 className="section-title">Shopping Cart</h2>

      <div className="cart-items">

        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>

            <div className="cart-item-image">
              <img
                src={item.image}
                alt={item.name}
                className="cart-img"
              />
            </div>

            <div className="cart-item-details">
              <h4 className="cart-item-name">
                {item.name}
              </h4>

              <p className="cart-item-price">
                ₹{item.price.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="cart-item-quantity">
              <button
                className="qty-btn"
                onClick={() =>
                  onUpdateQuantity(
                    item.id,
                    item.quantity - 1
                  )
                }
                disabled={item.quantity <= 1}
              >
                −
              </button>

              <span className="qty-value">
                {item.quantity}
              </span>

              <button
                className="qty-btn"
                onClick={() =>
                  onUpdateQuantity(
                    item.id,
                    item.quantity + 1
                  )
                }
              >
                +
              </button>
            </div>

            <div className="cart-item-total">
              ₹{(
                item.price * item.quantity
              ).toLocaleString('en-IN')}
            </div>

            <button
              className="btn btn-remove"
              onClick={() =>
                onRemoveFromCart(item.id)
              }
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      <div className="cart-summary">

        <div className="cart-summary-row">
          <span>Total Items:</span>
          <span>{getTotalItems()}</span>
        </div>

        <div className="cart-summary-row grand-total">
          <span>Grand Total:</span>

          <span>
            ₹{getTotalPrice().toLocaleString('en-IN')}
          </span>
        </div>

        <button
          className="btn btn-primary btn-checkout"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </button>

      </div>
    </section>
  );
}

export default Cart;