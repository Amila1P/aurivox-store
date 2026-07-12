import { Link } from 'react-router-dom';
import { useOrdersStore } from '../store/ordersStore.js';

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function Orders() {
  const orders = useOrdersStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p>Completed orders will show up here.</p>
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
        <h2>Your orders</h2>
        <span className="section-sub">{orders.length} total</span>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-card-header">
              <span className="tag-chip">{order.id}</span>
              <span className="order-date">{formatDate(order.placedAt)}</span>
            </div>
            <div className="order-customer">
              {order.customerName} — {order.customerEmail}
            </div>
            <ul className="order-items">
              {order.items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="order-total">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
