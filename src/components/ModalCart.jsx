import { useContext } from 'react';
import { CartContext } from '../services/CartContext';

export default function ModalCart({ onClose }) {
  const { items, removeFromCart } = useContext(CartContext);

  return (
    <div className="modal">
      <h2>Корзина</h2>
      <button onClick={onClose}>Закрыть</button>
      {items.length === 0 ? <p>Пусто</p> : (
        <ul>
          {items.map((item) => (
            <li key={item.productId}>
              {item.name} — {item.quantity} шт. — {item.price} ₽
              <button onClick={() => removeFromCart(item.productId)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
