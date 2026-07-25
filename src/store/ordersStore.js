import { create } from 'zustand';

// A couple of seeded "past" orders so the Orders page has history on first load.
const initialOrders = [
  {
    id: 'ORD-10231',
    customerName: 'Amara Fontaine',
    customerEmail: 'amara.fontaine@example.com',
    items: [
      { id: 1, name: 'Wireless Noise-Canceling Headphones', quantity: 1, price: 129.0 },
      { id: 2, name: 'USB-C Hub', quantity: 2, price: 24.5 },
    ],
    total: 178.0,
    placedAt: '2026-06-18T14:32:00Z',
  },
  {
    id: 'ORD-10247',
    customerName: 'Devon Marsh',
    customerEmail: 'devon.marsh@example.com',
    items: [{ id: 9, name: 'Everyday Canvas Tote', quantity: 1, price: 32.0 }],
    total: 32.0,
    placedAt: '2026-06-29T09:05:00Z',
  },
];

export const useOrdersStore = create((set) => ({
  orders: initialOrders,
  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
    })),
}));
