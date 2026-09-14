import { useEffect, useState, useMemo } from 'react';
import Banner from '../components/Banner.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { fetchProducts } from '../api/productApi.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  // Dynamically extract unique categories from products, defaulting with 'All'
  const categories = useMemo(() => {
    const rawCategories = products
      .map((p) => p.category)
      .filter((cat) => typeof cat === 'string' && cat.trim().length > 0);
    const unique = Array.from(new Set(rawCategories));
    return ['All', ...unique];
  }, [products]);

  // Combined filtering logic: category filter + real-time search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        typeof product.name === 'string' &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <>
      {/* Horizontal Category Filter & Real-Time Search Bar placed directly below main header */}
      <section className="store-filter-bar" aria-label="Search and category filters">
        <div className="container store-filter-container">
          {/* Real-Time Search Bar */}
          <div className="search-bar-wrapper">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="product-search-input"
              type="text"
              className="search-input"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products by name"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
              >
                &times;
              </button>
            )}
          </div>

          {/* Horizontal Category Filter Buttons (horizontally scrollable) */}
          <div className="category-filter-scroll" role="tablist" aria-label="Product categories">
            {categories.map((category) => {
              const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`category-chip ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

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
          <div>
            <h2>Shop the collection</h2>
            {selectedCategory !== 'All' && (
              <span className="active-filter-tag">
                Category: <strong>{selectedCategory}</strong>
              </span>
            )}
          </div>
          <span className="section-sub">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            {(searchQuery || selectedCategory !== 'All') && ` (filtered from ${products.length})`}
          </span>
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-ink-soft)' }}>Loading products…</p>
        ) : filteredProducts.length === 0 ? (
          <div className="filter-empty-state">
            <div className="filter-empty-icon">🔍</div>
            <h3>No products found</h3>
            <p>
              We couldn&apos;t find any products matching{' '}
              {searchQuery && <strong>&quot;{searchQuery}&quot;</strong>}
              {searchQuery && selectedCategory !== 'All' && ' in '}
              {selectedCategory !== 'All' && <strong>{selectedCategory}</strong>}.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
