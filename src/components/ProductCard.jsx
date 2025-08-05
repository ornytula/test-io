import { Link, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../services/CartContext'
import { FavoritesContext } from '../services/FavoritesContext'

export default function ProductCard({ product }) {
  const { categoryId } = useParams()
  const { addToCart } = useContext(CartContext)
 const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext)
const productId = product._id
const isFavorite = favorites.includes(productId)
  return (
    <li className="product-card" key={productId}>
      <div className="card-icons">
        <button
          className={`icon-btn ${isFavorite ? 'favored' : ''}`}
         
onClick={() =>
  isFavorite
    ? removeFromFavorites(productId)
    : addToFavorites(productId)
}
          aria-label="Добавить в избранное"
        >
          <img src="/images/icons/fav.png" alt="Fav" />
        </button>

        <button
          className="icon-btn"
          onClick={() => addToCart(product)}
          aria-label="Добавить в корзину"
        >
          <img src="/images/icons/cart.png" alt="Cart" />
        </button>
      </div>

      {/* Переход на подробную страницу товара */}
      <Link to={`/catalog/${categoryId}/${productId}`} className="product-link">
        <img src={product.imagePreview} alt={product.name} className="product-thumb" />

        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <p className="product-short">{product.shortDescription}</p>
        <div className="product-meta">
          <span className="product-price"><strong>{product.price} ₽</strong></span>
        </div>

        {/* Форма активности — например, "В наличии"/"Нет в наличии" */}
        <p className="product-active">
          {product.inStock ? "В наличии" : "Нет в наличии"}
        </p>

        {/* Форма звездного рейтинга */}
        <div className="product-rating">
          {"★".repeat(Math.round(product.rating))}{" "}
          <span className="rating-value">{product.rating}</span>
        </div>

        {/* Можно добавить еще элементы */}
      </Link>
    </li>
  )
}
