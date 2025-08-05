import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetch('/api/profile', {
        headers: { Authorization: 'Bearer ' + token }
      })
        .then(res => res.json())
        .then(data => setUser(data.user))
        .catch(() => {
          setUser(null);
          setToken(null);
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return false;
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('token', data.token);
    return true;
  };

  const register = async (name, email, password) => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) return false;
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('token', data.token);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
