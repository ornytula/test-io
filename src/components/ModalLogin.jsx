import { useState, useContext } from 'react';
import { AuthContext } from '../services/AuthContext';

export default function ModalLogin({ onClose }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const ok = await login(email, password);
    if (ok) {
      onClose();
    } else {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Вход</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <button type="submit" className="submit-btn">Войти</button>
          {error && <div className="form-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
