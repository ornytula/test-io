import { useEffect, useMemo, useState } from 'react';
import './filters.css';

export default function Filters({ products, onChange }) {
  // локальное состояние выбранных фильтров
  const [selected, setSelected] = useState({
    brands:     new Set(),
    types:      new Set(),
    colors:     new Set(),
    pickups:    new Set(),
    bag:        null,          // true / false / null(любой)
    price:      [0, 0],        // [min, max]
  });

  // диапазон цен на основе входных товаров
  const priceRange = useMemo(() => {
    const prices = products.map(p => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  // уникальные значения для чек‑боксов
  const options = useMemo(() => ({
    brands:  [...new Set(products.map(p => p.brand))].sort(),
    types:   [...new Set(products.map(p => p.type))].sort(),
    colors:  [...new Set(products.map(p => p.color))].sort(),
    pickups: [...new Set(products.map(p => p.pickup))].sort(),
  }), [products]);

  // сообщаем родителю, когда фильтры меняются
  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  // ————— helpers —————
  const toggleSet = (key, value) => {
    setSelected(prev => {
      const set = new Set(prev[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [key]: set };
    });
  };

  const handlePrice = (idx, val) => {
    setSelected(prev => {
      const next = [...prev.price];
      next[idx]  = Number(val);
      return { ...prev, price: next };
    });
  };

  // ————— UI —————
  return (
    <aside className="filters">
      {/* Бренд */}
      <Accordion title="Manufacturer">
        {options.brands.map(b => (
          <label key={b} className="check-row">
            <input
              type="checkbox"
              checked={selected.brands.has(b)}
              onChange={() => toggleSet('brands', b)}
            />
            {b}
          </label>
        ))}
      </Accordion>

      {/* Тип гитары */}
      <Accordion title="Model">
        {options.types.map(t => (
          <label key={t} className="check-row">
            <input
              type="checkbox"
              checked={selected.types.has(t)}
              onChange={() => toggleSet('types', t)}
            />
            {t}
          </label>
        ))}
      </Accordion>

      {/* Цвет */}
      <Accordion title="Colour">
        {options.colors.map(c => (
          <label key={c} className="check-row">
            <input
              type="checkbox"
              checked={selected.colors.has(c)}
              onChange={() => toggleSet('colors', c)}
            />
            {c}
          </label>
        ))}
      </Accordion>

      {/* Наличие сумки */}
      <Accordion title="Incl. Gigbag">
        {['Yes', 'No'].map(v => (
          <label key={v} className="check-row">
            <input
              type="radio"
              name="bag"
              checked={selected.bag === (v === 'Yes')}
              onChange={() => setSelected(p => ({ ...p, bag: v === 'Yes' }))}
            />
            {v}
          </label>
        ))}
        <button
          className="clear-radio"
          onClick={() => setSelected(p => ({ ...p, bag: null }))}
        >
          Clear
        </button>
      </Accordion>

      {/* Тип звукоснимателей */}
      <Accordion title="Pickup System">
        {options.pickups.map(pk => (
          <label key={pk} className="check-row">
            <input
              type="checkbox"
              checked={selected.pickups.has(pk)}
              onChange={() => toggleSet('pickups', pk)}
            />
            {pk}
          </label>
        ))}
      </Accordion>

      {/* Цена */}
      <Accordion title="Price Range">
        <div className="price-row">
          <input
            type="number"
            value={selected.price[0]}
            min={priceRange[0]}
            max={selected.price[1]}
            onChange={e => handlePrice(0, e.target.value)}
          />
          <span>—</span>
          <input
            type="number"
            value={selected.price[1]}
            min={selected.price[0]}
            max={priceRange[1]}
            onChange={e => handlePrice(1, e.target.value)}
          />
        </div>
        {/* Ползунок */}
        <input
          type="range"
          className="price-slider"
          min={priceRange[0]}
          max={priceRange[1]}
          value={selected.price[0]}
          onChange={e => handlePrice(0, e.target.value)}
        />
        <input
          type="range"
          className="price-slider"
          min={priceRange[0]}
          max={priceRange[1]}
          value={selected.price[1]}
          onChange={e => handlePrice(1, e.target.value)}
        />
      </Accordion>
    </aside>
  );
}

/* ——— аккордеон ——— */
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="acc">
      <header onClick={() => setOpen(o => !o)}>
        {title}
        <span className={`plus ${open ? 'open' : ''}`}>+</span>
      </header>
      {open && <div className="acc-body">{children}</div>}
    </section>
  );
}
