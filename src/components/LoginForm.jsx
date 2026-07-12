import { useState } from 'react';
import { useUserStore } from '../store/userStore.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const login = useUserStore((state) => state.login);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }
    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      login(fullName.trim(), email.trim());
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <div className="field-group">
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={errors.fullName ? 'has-error' : ''}
          aria-label="Full name"
        />
        {errors.fullName && <span className="field-error">{errors.fullName}</span>}
      </div>
      <div className="field-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'has-error' : ''}
          aria-label="Email"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
