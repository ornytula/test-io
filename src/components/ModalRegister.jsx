import { useState, useContext } from 'react';
import ModalWrapper from "./ModalWrapper";
import { AuthContext } from '../services/AuthContext';

export default function ModalRegister({ onClose }) {
  const { register } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const ok = await register(name, email, password);
    if (ok) {
      setSuccess(true);
      setTimeout(onClose, 1000);
    } else {
      setError('Ошибка регистрации');
    }
  };

  return (
    <ModalWrapper title="Регистрация" onClose={onClose}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Имя пользователя:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>Пароль:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="submit-btn">Зарегистрироваться</button>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Регистрация успешна</div>}
      </form>
    </ModalWrapper>
  );
}
