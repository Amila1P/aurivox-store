import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUserStore } from '../store/userStore.js';
import { selectCartTotalQuantity } from '../store/cartSlice.js';
import LoginForm from './LoginForm.jsx';

export default function Header() {
  const { isLoggedIn, welcomeMessage, fullName, email, logout } = useUserStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    welcomeMessage: state.welcomeMessage,
    fullName: state.fullName,
    email: state.email,
    logout: state.logout,
  }));
  const cartQuantity = useSelector(selectCartTotalQuantity);

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">A</span>
          <span className="brand-name">
            Aurivo<em>X</em>
          </span>
          <p className="brand-tagline">Smart shopping for modern life.</p>
        </NavLink>

        <nav className="main-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Cart
            {cartQuantity > 0 && <span className="nav-badge">{cartQuantity}</span>}
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Orders
          </NavLink>
        </nav>

        <div className="header-auth">
          {isLoggedIn ? (
            <div className="welcome-chip">
              <span>
                Welcome, <strong>{fullName}</strong> — <span className="chip-email">{email}</span>
              </span>
              <button className="btn btn-outline" onClick={logout} style={{ padding: '5px 12px', fontSize: 12 }}>
                Logout
              </button>
            </div>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </header>
  );
}
