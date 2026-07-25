import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api/productApi.js";

function Products() {
  // Store products from the API
  const [products, setProducts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);

  useEffect(() => {

    const getProducts = async () => {
      try {

        const data = await fetchProducts();

        setProducts(data);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }
    };

    getProducts();

  }, []);

  if (loading) return <p>Loading products...</p>;

  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div>
      <h2>Our Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;












// Legacy sample data removed during the AurivoX rebrand.
// The live product list is loaded from the API in src/api/productApi.js.





--------*/