import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  // Получение избранного с сервера при авторизации
  useEffect(() => {
    if (!token) return;
    fetch('/api/favorites', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, [token]);

  // Добавить в избранное
  const addToFavorites = async (productId) => {
    if (!token) return;
    const res = await fetch('/api/favorites/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ _id: productId })
    });
    const data = await res.json();
    setProducts(data.products || []);
  };

  // Удалить из избранного
  const removeFromFavorites = async (productId) => {
    if (!token) return;
    const res = await fetch(`/api/favorites/remove/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    setProducts(data.products || []);
  };

  // Проверить, есть ли товар в избранном
  const isFavorite = (productId) => products.includes(productId);

 return (
  <FavoritesContext.Provider value={{
    favorites: products, // <-- ключ favorites, содержит массив id товаров
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }}>
    {children}
  </FavoritesContext.Provider>
);

}


