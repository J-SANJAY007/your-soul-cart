import React, { useState } from 'react';

function Checkout({ cartItems, onPlaceOrder, onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      items: cartItems,
      totalPrice: getTotalPrice(),
      totalItems: getTotalItems(),
      customer: formData,
      paymentMethod
    };
    onPlaceOrder(orderData);
  };

  return (
    <section className="checkout-page">
      <h2 className="section-title">Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-layout">
          <div className="checkout-left">
            <h3>Customer Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Sanjay"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="9876543210"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="sanjay@example.com"
              />
            </div>
            <div className="form-group">
              <label>Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
                placeholder="123, Main Street"
              />
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Guduvanchery"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Chennai"
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="Tamil Nadu"
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  placeholder="603202"
                />
              </div>
            </div>

            <h3>Payment Method</h3>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash On Delivery</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>UPI</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="debit"
                  checked={paymentMethod === 'debit'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Debit Card</span>
              </label>
            </div>
          </div>

          <div className="checkout-right">
  <h3>Order Summary</h3>

  <div className="order-summary-items">
    {cartItems.map((item) => (
      <div className="order-summary-item" key={item.id}>
        <div className="order-item-left">
          <img
            src={item.image}
            alt={item.name}
            className="checkout-img"
          />

          <div>
            <p className="order-item-name">{item.name}</p>
            <p className="order-item-price">
              ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
            </p>
          </div>
        </div>

        <span className="order-item-total">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </span>
      </div>
    ))}
  </div>

  <div className="order-summary-totals">
    <div className="summary-row">
      <span>Total Items:</span>
      <span>{cartItems.length}</span>
    </div>

    <div className="summary-row">
      <span>Total Quantity:</span>
      <span>{getTotalItems()}</span>
    </div>

    <div className="summary-row">
      <span>Delivery Charge:</span>
      <span>FREE</span>
    </div>

    <div className="summary-row grand-total">
      <span>Total Amount:</span>
      <span>₹{getTotalPrice().toLocaleString("en-IN")}</span>
    </div>

    <div className="summary-row delivery-address">
      <span>Delivery Address:</span>
      <span>
        {formData.addressLine1}
        {formData.addressLine2 &&
          `, ${formData.addressLine2}`},
        {" "}
        {formData.city},
        {" "}
        {formData.state}
        {" - "}
        {formData.pincode}
      </span>
    </div>

    <div className="summary-row">
      <span>Payment Method:</span>
      <span className="payment-label">
        {paymentMethod === "cod" && "Cash On Delivery"}
        {paymentMethod === "upi" && "UPI"}
        {paymentMethod === "credit" && "Credit Card"}
        {paymentMethod === "debit" && "Debit Card"}
      </span>
    </div>
  </div>

  <div className="checkout-actions">
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => onNavigate("cart")}
    >
      Back to Cart
    </button>

    <button
      type="submit"
      className="btn btn-primary btn-place-order"
    >
      Place Order
    </button>
  </div>
</div>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
