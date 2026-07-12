import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUserStore } from '../store/userStore.js';
import { useOrdersStore } from '../store/ordersStore.js';
import { selectCartItems, selectCartTotalPrice, clearCart } from '../store/cartSlice.js';

export default function Payment() {
  const { isLoggedIn, fullName, email } = useUserStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    fullName: state.fullName,
    email: state.email,
  }));
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  const addOrder = useOrdersStore((state) => state.addOrder);
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Guard: must be logged in
  if (!isLoggedIn) {
    return (
      <div className="container">
        <div className="notice">
          Please log in from the header before proceeding to payment.
        </div>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    );
  }

  // Guard: cart cannot be empty
  if (items.length === 0) {
    return (
      <div className="container">
        <div className="notice">Your cart is empty — add a few items before checking out.</div>
        <Link to="/" className="btn btn-primary">
          Shop products
        </Link>
      </div>
    );
  }

  async function handleCompleteOrder() {
    setSubmitting(true);
    setError('');

    const order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 89999)}`,
      customerName: fullName,
      customerEmail: email,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: totalPrice,
      placedAt: new Date().toISOString(),
    };

    try {
      await fetch('https://api.tawsoft.com/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
    } catch (err) {
      // The demo endpoint may be unreachable in some environments — the order
      // still completes locally so the flow can be demonstrated end-to-end.
      console.warn('Order POST failed, continuing with local confirmation:', err);
    }

    addOrder(order);
    dispatch(clearCart());
    setSubmitting(false);
    navigate('/orders');
  }

  return (
    <div className="container">
      <div className="section-heading">
        <h2>Payment</h2>
      </div>

      <div className="payment-layout">
        <div>
          <div className="payment-card">
            <h3>Customer details</h3>
            <div className="customer-row">
              <span>Name</span>
              <strong>{fullName}</strong>
            </div>
            <div className="customer-row">
              <span>Email</span>
              <strong>{email}</strong>
            </div>
          </div>

          <div className="payment-card">
            <h3>Order items</h3>
            {items.map((item) => (
              <div className="payment-item-row" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {error && <div className="notice">{error}</div>}
        </div>

        <div className="cart-summary">
          <h3>Total due</h3>
          <div className="summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={handleCompleteOrder} disabled={submitting}>
            {submitting ? 'Processing…' : 'Complete order'}
          </button>
        </div>
      </div>
    </div>
  );
}
