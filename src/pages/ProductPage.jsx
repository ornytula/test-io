import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../services/CartContext'

export default function ProductPage() {
  const { categoryId, productId } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(`/api/products/${categoryId}/${productId}`)
        const item = await r.json()
        setProduct({ ...item, id: item._id })
      } catch (e) {
        console.error(e)
        setProduct(null)
      }
    }
    load()
  }, [categoryId, productId])

  if (!product) return <div>Товар не найден</div>

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.imagePreview} alt={product.name} style={{maxWidth: 300}} />
      <p><b>Цена:</b> {product.price} ₽</p>
      <p><b>Описание:</b> {product.description}</p>
      <button onClick={() => addToCart(product)}>В корзину</button>
    </div>
  )
}
