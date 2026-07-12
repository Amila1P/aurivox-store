# Mini Online Store

Mini Online Store is a React + Vite e-commerce demo for browsing products, viewing product details, managing a cart, and completing a simple checkout flow.

## Features

- Product browsing from a remote API
- Product detail pages with add-to-cart support
- Cart quantity management and totals
- Simple payment flow and order confirmation
- Login state management for checkout access
- Loading and not-found handling on product pages

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- React Router DOM
- Redux Toolkit
- Zustand
- Fetch API

## Project Structure

```
src/
  main.jsx              Application entry point
  App.jsx               App shell and routing
  index.css             Global styles
  api/
    productApi.js       Product API service and response normalization
  components/
    Banner.jsx
    Footer.jsx
    Header.jsx
    LoginForm.jsx
    ProductCard.jsx
  data/
    products.jsx        Product listing page and UI state handling
  pages/
    Cart.jsx
    Home.jsx
    NotFound.jsx
    Orders.jsx
    Payment.jsx
    ProductDetails.jsx
  store/
    cartSlice.js
    ordersStore.js
    store.js
    userStore.js
```

## Installation & Setup

1. Clone the repository.
2. Install dependencies.

```bash
npm install
```

3. Configure environment variables.
4. Start the development server.

```bash
npm run dev
```

## Environment Variables

Create a local `.env` file with the API base URL used by the product service.

```bash
VITE_API_BASE_URL=https://testapi.techwavedy.com
```

The repository includes `.env.example` with the same variable so new environments can be configured consistently.

## API Integration

The frontend communicates with the product API through [src/api/productApi.js](src/api/productApi.js). That service exports `fetchProducts()` and `fetchProductById()` and normalizes the response so the existing UI can keep using the same product fields.

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

## Build for Production

Run the production build command to generate optimized static assets in `dist/`.

```bash
npm run build
```

After building, preview the output locally with:

```bash
npm run preview
```

## Future Improvements

- Add dedicated error states to the product listing page
- Add search and filtering for the catalog
- Replace the demo checkout endpoint with a production backend
- Add pagination or infinite scroll for larger catalogs

## Author

Amila
