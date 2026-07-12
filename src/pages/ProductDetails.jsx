import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice.js';
import { fetchProductById } from '../api/productApi.js';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setJustAdded(false);
    fetchProductById(id).then((data) => {
      if (active) {
        setProduct(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      })
    );
    setJustAdded(true);
  }

  if (loading) {
    return (
      <div className="container">
        <p style={{ color: 'var(--color-ink-soft)', marginTop: 40 }}>Loading product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>Product not found</h2>
          <p>We couldn't find that item in our catalog.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="details-back">
        ← Back to products
      </Link>

      <div className="details-layout">
        <div className="details-media">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info">
          <h1>{product.name}</h1>
          <div className="details-price">${product.price.toFixed(2)}</div>
          <p className="details-description">{product.description}</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to cart
          </button>
          {justAdded && <p className="details-note">Added to your cart — head to the cart page to check out.</p>}
        </div>
      </div>
    </div>
  );
}
