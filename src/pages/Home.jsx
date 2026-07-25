import { useEffect, useState } from 'react';
import Banner from '../components/Banner.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { fetchProducts } from '../api/productApi.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProducts().then((data) => {
      if (active) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container">
      <div className="banner-stack">
        <Banner
          variant="forest"
          eyebrow="Big Summer Sale"
          title="Up to 50% off top picks"
          subtitle="Shop electronics, accessories, fashion, and everyday essentials at seasonal prices."
        />
        <Banner
          variant="clay"
          eyebrow="Weekend deals"
          title="Fast delivery, fresh drops"
          subtitle="Order by Friday and get curated products delivered and ready for the weekend."
        />
      </div>

      <div className="section-heading">
        <h2>Shop the collection</h2>
        <span className="section-sub">{products.length} items</span>
      </div>

      {loading ? (
        <p style={{ color: 'var(--color-ink-soft)' }}>Loading products…</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
