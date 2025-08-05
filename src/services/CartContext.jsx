// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext()

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch('/api/cart', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => setItems(data.items))
      .catch(() => setItems([]));
  }, [token]);

 const addToCart = async (product) => {
  if (!token) return;
  const res = await fetch('/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      _id: product._id || product.id,
      name: product.name,
      price: product.price,
    }),
  });
  const data = await res.json();
  setItems(data.items);
};

  const removeFromCart = async (productId) => {
    if (!token) return;
    const res = await fetch('/api/cart/remove/' + productId, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    setItems(data.items);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ⬅️ Это то, что искал:
export function useCart() {
  return useContext(CartContext);
}
