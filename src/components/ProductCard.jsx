import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.tag && <span className="product-tag">{product.tag}</span>}
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.shortDescription}</p>
        <div className="product-footer">
          <span className="price-tag">${product.price.toFixed(2)}</span>
          <Link to={`/product/${product.id}`} className="btn btn-outline">
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
