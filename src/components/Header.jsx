import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import ModalCart from './ModalCart';
import ModalFavorites from './ModalFavorites';
import ModalProfile from './ModalProfile';
import { CartContext } from '../services/CartContext';
import { AuthContext } from '../services/AuthContext';
import { FavoritesContext } from '../services/FavoritesContext';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { items } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);

  return (
    <header className="header">
      <div className="header__top">
        <div className="container header__top-inner">
          <Link to="/" className="logo">
            <img src="/images/logo/logo.png" alt="Guitar Shop" />
          </Link>
          <div className="header__tools">
            <select className="currency">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>

            {/* Избранное */}
           <button
  className="icon-btn"
  onClick={() => setShowFavorites(true)}
>
  <img src="/images/icons/favorite.png" alt="Избранное" />
<span className="cart__count">{favorites.length}</span>
</button>

            {/* Корзина */}
            <button className="icon-btn" onClick={() => setShowCart(true)}>
              <img src="/images/icons/cart.png" alt="Корзина" />
              <span className="cart__count">{items.length}</span>
            </button>

            {user ? (
              /* Пользователь вошёл */
              <button
                className="icon-btn"
                onClick={() => setShowProfile(true)}
              >
                <img src="/images/icons/profile.png" alt="Профиль" />
              </button>
            ) : (
              /* Не авторизован */
              <>
                <button
                  className="icon-btn login-btn"
                  onClick={() => setShowLogin(true)}
                >
                  <img src="/images/icons/login.png" alt="Вход" />
                </button>
                <button
                  className="icon-btn register-btn"
                  onClick={() => setShowRegister(true)}
                >
                  <img src="/images/icons/register.png" alt="Регистрация" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Навигация */}
      <nav className="header__nav">
        {/* ... остальная навигация ... */}
      </nav>

      {/* Модальные окна */}
      {showLogin && <ModalLogin onClose={() => setShowLogin(false)} />}
      {showRegister && (
        <ModalRegister onClose={() => setShowRegister(false)} />
      )}
      {showCart && <ModalCart onClose={() => setShowCart(false)} />}
      
{showFavorites && (
  <ModalFavorites onClose={() => setShowFavorites(false)} />
)}
  <span className="cart__count">{favorites.length}</span>

      {showProfile && (
        <ModalProfile onClose={() => setShowProfile(false)} user={user} />
      )}
    </header>
  );
}
