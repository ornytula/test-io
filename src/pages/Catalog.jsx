import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import './Catalog.css'
import './filters.css'
import Hero from '../components/Hero'
import { useCart } from '../services/CartContext'

export default function Catalog() {
  const { categoryId } = useParams()
  const { addToCart } = useCart() // Только это!

  const [products, setProducts] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [favorites, setFavorites] = useState([])

  const [selected, setSelected] = useState({
    brands: new Set(),
    types: new Set(),
    colors: new Set(),
    pickups: new Set(),
    bag: null,
    price: [0, 0],
  })

  const fileMap = {
    'electric-guitars': 'electric_guitars',
    'bass-guitars': 'bass_guitars',
    'classical-guitars': 'classical_guitars',
    'acoustic-guitars': 'acoustic_guitars',
  }

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(`http://localhost:3001/api/products/${fileMap[categoryId]}`)
        const data = await r.json()
        setProducts(data.products)
        setCategoryName(data.name)
        const prices = data.products.map(p => p.price)
        setSelected(s => ({ ...s, price: [Math.min(...prices), Math.max(...prices)] }))
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [categoryId])

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selected.brands.size && !selected.brands.has(p.brand)) return false
      if (selected.types.size && !selected.types.has(p.bodyShape)) return false
      if (selected.colors.size && !selected.colors.has(p.color)) return false
      if (selected.pickups.size && !selected.pickups.has(p.pickups)) return false
      if (selected.bag !== null && selected.bag !== (p.gigbagIncluded === 'Да')) return false
      if (p.price < selected.price[0] || p.price > selected.price[1]) return false
      return true
    })
  }, [products, selected])

  const toggleSet = (key, value) => {
    setSelected(prev => {
      const set = new Set(prev[key])
      set.has(value) ? set.delete(value) : set.add(value)
      return { ...prev, [key]: set }
    })
  }

  const setPrice = (idx, val) => {
    setSelected(prev => {
      const price = [...prev.price]
      price[idx] = Number(val)
      return { ...prev, price }
    })
  }

  const unique = (field) => [...new Set(products.map(p => p[field]))].sort()

  return (
    <>
      <Hero />
      <div className="catalog-layout">
        <aside className="filters">
          <Accordion title="Бренд">
            {unique('brand').map(val => (
              <label key={val}><input type="checkbox" checked={selected.brands.has(val)} onChange={() => toggleSet('brands', val)} /> {val}</label>
            ))}
          </Accordion>
          <Accordion title="Тип корпуса">
            {unique('bodyShape').map(val => (
              <label key={val}><input type="checkbox" checked={selected.types.has(val)} onChange={() => toggleSet('types', val)} /> {val}</label>
            ))}
          </Accordion>
          <Accordion title="Цвет">
            {unique('color').map(val => (
              <label key={val}><input type="checkbox" checked={selected.colors.has(val)} onChange={() => toggleSet('colors', val)} /> {val}</label>
            ))}
          </Accordion>
          <Accordion title="Звукосниматели">
            {unique('pickups').map(val => (
              <label key={val}><input type="checkbox" checked={selected.pickups.has(val)} onChange={() => toggleSet('pickups', val)} /> {val}</label>
            ))}
          </Accordion>
          <Accordion title="С чехлом">
            {['Да', 'Нет'].map(val => (
              <label key={val}><input type="radio" name="bag" checked={selected.bag === (val === 'Да')} onChange={() => setSelected(p => ({ ...p, bag: val === 'Да' }))} /> {val}</label>
            ))}
            <button onClick={() => setSelected(p => ({ ...p, bag: null }))}>Сбросить</button>
          </Accordion>
          <Accordion title="Цена">
            <input type="number" value={selected.price[0]} onChange={e => setPrice(0, e.target.value)} />
            <input type="number" value={selected.price[1]} onChange={e => setPrice(1, e.target.value)} />
            <input type="range" min={selected.price[0]} max={selected.price[1]} value={selected.price[0]} onChange={e => setPrice(0, e.target.value)} />
            <input type="range" min={selected.price[0]} max={selected.price[1]} value={selected.price[1]} onChange={e => setPrice(1, e.target.value)} />
          </Accordion>
        </aside>

        <main className="product-wrap">
          <h1>{categoryName}</h1>
          <ul className="product-grid">
            {filteredProducts.map(product => {
              const id = product._id || product.id
              const isFav = favorites.includes(id)

              return (
                <li className="product-card" key={id}>
                  <div className="card-icons">
                    <button className="icon-btn" onClick={() => toggleFavorite(id)}>
                      <img src={isFav ? "/images/icons/fav-filled.png" : "/images/icons/fav.png"} alt="Fav" />
                    </button>
                    <button className="icon-btn" onClick={() => addToCart(product)}>
                      <img src="/images/icons/cart.png" alt="Cart" />
                    </button>
                  </div>
                  <Link to={`/catalog/${categoryId}/${id}`} className="product-link">
                    <img src={product.imagePreview} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.shortDescription}</p>
                    <p><strong>{product.price} ₽</strong></p>
                    <p>{product.inStock ? "В наличии" : "Нет в наличии"}</p>
                    <p>★ {product.rating}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </main>
      </div>
    </>
  )
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <section className="acc">
      <header onClick={() => setOpen(o => !o)}>{title}<span className="plus">{open ? '−' : '+'}</span></header>
      {open && <div className="acc-body">{children}</div>}
    </section>
  )
}
