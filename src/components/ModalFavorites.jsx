import { useContext, useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { FavoritesContext } from '../services/FavoritesContext';

export default function ModalFavorites({ onClose }) {
  const { favorites } = useContext(FavoritesContext); // <-- используем контекст
  const [products, setProducts] = useState([]);

  // Для каждого id — получить товар
  useEffect(() => {
    if (!favorites.length) {
      setProducts([]);
      return;
    }
    Promise.all(
      favorites.map(id =>
        fetch(`/api/products/${id}`).then(r => r.json()).then(d => d.product)
      )
    )
      .then(list => setProducts(list))
      .catch(() => setProducts([]));
  }, [favorites]);

  return (
    <ModalWrapper title="Избранное" onClose={onClose}>
      <div className="fav-box">
        {products.length === 0 ? (
          <p>Нет избранных товаров</p>
        ) : (
          <ul className="fav-list">
            {products.map(item => (
              <li key={item._id} className="fav-item">
                <img src={item.imagePreview} alt={item.name} className="fav-thumb" />
                <div className="fav-info">
                  <h4>{item.name}</h4>
                  <p>{item.price} ₽</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ModalWrapper>
  );
}