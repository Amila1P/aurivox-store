const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

function normalizeProduct(product) {
  return {
    ...product,
    price: Number(product.price) / 100,
    shortDescription: product.shortDescription ?? product.description ?? '',
    tag: product.tag ?? null,
  };
}

function normalizeProductsResponse(data) {
  if (Array.isArray(data)) {
    return data.map(normalizeProduct);
  }

  if (Array.isArray(data?.products)) {
    return data.products.map(normalizeProduct);
  }

  if (Array.isArray(data?.data)) {
    return data.data.map(normalizeProduct);
  }

  return [];
}

// Fetch the product collection from the API and normalize the fields used by the UI.
export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const data = await response.json();
  return normalizeProductsResponse(data);
}

// Fetch a single product so the details page can keep its current loading/not-found behavior.
export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to load product');
  }

  const data = await response.json();
  return data ? normalizeProduct(data) : null;
}