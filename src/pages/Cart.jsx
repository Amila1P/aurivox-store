import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from '../store/cartSlice.js';

export default function Cart() {
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Browse the collection and add something green to your cart.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Shop products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-heading">
        <h2>Your cart</h2>
        <span className="section-sub">{totalQuantity} items</span>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <div className="cart-row-name">{item.name}</div>
                <div className="cart-row-unit">${item.price.toFixed(2)} each</div>
              </div>
              <div className="qty-control">
                <button onClick={() => dispatch(decrementQuantity(item.id))} aria-label="Decrease quantity">
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(incrementQuantity(item.id))} aria-label="Increase quantity">
                  +
                </button>
              </div>
              <div className="cart-row-total">${(item.price * item.quantity).toFixed(2)}</div>
              <button
                className="btn-danger"
                onClick={() => dispatch(removeItem(item.id))}
                aria-label={`Remove ${item.name}`}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order summary</h3>
          <div className="summary-line">
            <span>Items ({totalQuantity})</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/payment')}>
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
}
