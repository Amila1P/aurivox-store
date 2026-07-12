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












/* ------------ REMOVE THIS COMMENT BLOCK FOR OLD CODE -------------


// Dummy product catalog for Sprout & Stem — a boutique plant & garden-goods store.
// In a real app this would come from a backend; here it simulates the payload
// returned by a Fetch API call (see fetchProducts in this file).

export const products = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    shortDescription: 'Iconic split-leaf houseplant, easy care.',
    description:
      'The Monstera Deliciosa is prized for its dramatic, fenestrated leaves. Thrives in bright, indirect light and forgives the occasional missed watering — an ideal centerpiece for any bright room.',
    price: 42.0,
    image: 'https://picsum.photos/seed/monstera/600/450',
    tag: 'Best seller',
  },
  {
    id: 2,
    name: 'Terracotta Pot, 8"',
    shortDescription: 'Hand-thrown clay pot with drainage hole.',
    description:
      'A classic unglazed terracotta pot, hand-thrown and kiln-fired. The porous clay helps roots breathe and wicks away excess moisture, reducing the risk of root rot.',
    price: 18.5,
    image: 'https://picsum.photos/seed/terracotta/600/450',
    tag: null,
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    shortDescription: 'Statement plant with violin-shaped leaves.',
    description:
      'Tall, glossy, and sculptural, the Fiddle Leaf Fig is the plant world\'s favorite showpiece. Prefers a consistent spot with bright, filtered light and steady watering.',
    price: 58.0,
    image: 'https://picsum.photos/seed/fiddleleaf/600/450',
    tag: 'Best seller',
  },
  {
    id: 4,
    name: 'Copper Mist Sprayer',
    shortDescription: 'Fine-mist brass sprayer for humidity-loving plants.',
    description:
      'A solid brass pump sprayer that delivers a fine, even mist without soaking leaves. The weighted design feels balanced in hand and ages into a beautiful patina.',
    price: 24.0,
    image: 'https://picsum.photos/seed/coppermist/600/450',
    tag: null,
  },
  {
    id: 5,
    name: 'Heirloom Tomato Seed Set',
    shortDescription: 'Six rare open-pollinated tomato varieties.',
    description:
      'A curated set of six heirloom tomato varieties, chosen for flavor over shelf life. Each packet includes sowing depth, spacing, and days-to-maturity guidance.',
    price: 14.0,
    image: 'https://picsum.photos/seed/tomatoseeds/600/450',
    tag: 'New',
  },
  {
    id: 6,
    name: 'Bamboo Hand Trowel',
    shortDescription: 'Lightweight trowel with a smooth bamboo grip.',
    description:
      'Forged steel blade paired with a sanded bamboo handle. Balanced for precise digging around delicate roots, in raised beds or container gardens alike.',
    price: 16.0,
    image: 'https://picsum.photos/seed/bambootrowel/600/450',
    tag: null,
  },
  {
    id: 7,
    name: 'Snake Plant (Laurentii)',
    shortDescription: 'Nearly indestructible, air-purifying succulent.',
    description:
      'Upright, sword-like leaves edged in gold make the Snake Plant a striking low-maintenance choice. Tolerates low light and infrequent watering with ease.',
    price: 28.0,
    image: 'https://picsum.photos/seed/snakeplant/600/450',
    tag: null,
  },
  {
    id: 8,
    name: 'Woven Plant Hanger',
    shortDescription: 'Hand-macraméd cotton hanger, fits 6" pots.',
    description:
      'Hand-knotted from natural cotton cord, this hanger brings trailing plants into the light. Rated to hold up to 15 lbs and includes a sturdy ceiling hook.',
    price: 21.0,
    image: 'https://picsum.photos/seed/planthanger/600/450',
    tag: null,
  },
  {
    id: 9,
    name: 'Living Herb Trio',
    shortDescription: 'Basil, thyme, and mint in one planter box.',
    description:
      'A ready-to-grow trio of kitchen herbs planted in a slatted cedar box. Sits happily on a sunny windowsill and can be harvested within two weeks of arrival.',
    price: 32.0,
    image: 'https://picsum.photos/seed/herbtrio/600/450',
    tag: 'New',
  },
  {
    id: 10,
    name: 'Slow-Release Plant Food',
    shortDescription: 'Balanced 12-week feed for indoor greenery.',
    description:
      'A gentle, slow-release granular feed formulated for houseplants. One application nourishes for up to twelve weeks — no measuring, no guesswork.',
    price: 12.5,
    image: 'https://picsum.photos/seed/plantfood/600/450',
    tag: null,
  },
  {
    id: 11,
    name: 'Ceramic Watering Can',
    shortDescription: 'Matte glaze finish, 1.5L capacity.',
    description:
      'A hand-glazed ceramic watering can with a long, narrow spout for precise pours around delicate foliage. Holds 1.5 liters — enough for a full windowsill garden.',
    price: 36.0,
    image: 'https://picsum.photos/seed/wateringcan/600/450',
    tag: null,
  },
  {
    id: 12,
    name: 'Pothos Marble Queen',
    shortDescription: 'Trailing vine with marbled white variegation.',
    description:
      'A fast-growing trailing vine with striking cream-and-green marbled leaves. Adaptable to almost any light condition, making it a favorite for beginners.',
    price: 26.0,
    image: 'https://picsum.photos/seed/pothos/600/450',
    tag: 'Best seller',
  },
];

/**
 * Simulates a Fetch API call to a products endpoint.
 * Returns a Promise that resolves with the product catalog.
 */

/* ---------  REMOVE THIS COMMENT BLOCK FOR OLD CODE
export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 400);
  });
}

export function fetchProductById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((p) => p.id === Number(id)) || null);
    }, 300);
  });
}





--------*/