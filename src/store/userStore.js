import { create } from 'zustand';

/**
 * useUserStore — Zustand store for the logged-in customer.
 * Holds FullName, Email, a derived welcome message, and login/logout actions.
 */
export const useUserStore = create((set) => ({
  fullName: '',
  email: '',
  isLoggedIn: false,
  welcomeMessage: '',

  login: (fullName, email) =>
    set({
      fullName,
      email,
      isLoggedIn: true,
      welcomeMessage: `Welcome, ${fullName} — Email: ${email}`,
    }),

  logout: () =>
    set({
      fullName: '',
      email: '',
      isLoggedIn: false,
      welcomeMessage: '',
    }),
}));
