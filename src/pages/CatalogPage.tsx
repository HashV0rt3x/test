import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { Product } from '../types';
import { CATEGORIES, PRODUCTS, formatPrice } from '../store';

interface Props {
  cart: { product: Product; qty: number }[];
  onAdd: (product: Product) => void;
  onToast: (msg: string) => void;
  onOpenProduct: (product: Product) => void;
}

export function CatalogPage({ cart, onAdd, onToast, onOpenProduct }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const cartIds = useMemo(() => new Set(cart.map(i => i.product.id)), [cart]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAdd(product);
    onToast(`✓ Savatga qo'shildi`);
  };

  return (
    <>
      <div className="header">
        <span className="header-title">Do'kon 🛍️</span>
      </div>

      <div className="search-bar">
        <Search size={16} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Mahsulot qidirish..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="categories-scroll">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">Topilmadi</div>
          <div className="empty-desc">Boshqa kalit so'z bilan qidiring</div>
        </div>
      ) : (
        <>
          <div className="section-title">{filtered.length} ta mahsulot</div>
          <div className="products-grid">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="product-card fade-up"
                style={{ animationDelay: `${i * 30}ms` }}
                onClick={() => onOpenProduct(product)}
              >
                <div className="product-image">{product.emoji}</div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price-row">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="product-price-old">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  {product.inStock ? (
                    <button
                      className={`add-btn ${cartIds.has(product.id) ? 'added' : ''}`}
                      onClick={e => handleAdd(e, product)}
                    >
                      {cartIds.has(product.id) ? '✓ Savatda' : 'Savatga +'}
                    </button>
                  ) : (
                    <button
                      className="add-btn"
                      style={{ opacity: 0.4, cursor: 'not-allowed' }}
                      onClick={e => e.stopPropagation()}
                    >
                      Mavjud emas
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
