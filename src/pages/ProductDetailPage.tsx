import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice } from '../store';

interface Props {
  product: Product;
  cartQty: number;
  onAdd: (product: Product) => void;
  onBack: () => void;
  onGoCart: () => void;
  onToast: (msg: string) => void;
}

const PRODUCT_DESCRIPTIONS: Record<number, string> = {
  1: 'Apple\'ning eng yangi iPhone 15 Pro modeli. Titanium korpus, A17 Pro chip, 48MP kamera tizimi. ProMotion 120Hz ekran bilan chiziqsiz tajriba.',
  2: 'Samsung Galaxy S24 - Snapdragon 8 Gen 3 protsessor, 200MP kamera, AI funksiyalari bilan jihozlangan. 6.8" AMOLED ekran.',
  3: 'Apple AirPods Pro 2 - Faol shovqin o\'chirish (ANC), Adaptive Audio, H2 chip. 30 soatgacha batareya ishlash vaqti.',
  4: 'MacBook Air M3 - Apple\'ning M3 chipi bilan eng yengil noutbuk. 18 soat batareya, 15.3" Liquid Retina ekran.',
  5: 'Mahalliy bog\'lardan to\'plangan yangi olmalar. Vitamin C va antioxidantlarga boy. Kundalik iste\'mol uchun ideal.',
  6: 'Yangi pishirilgan bug\'doy uni noni. Tarkibida preservativlar yo\'q. Har kuni ertalab yangi pishiriladi.',
  7: 'Broccoli, sabzi, karam, qalampir va zanjabil o\'z ichiga olgan sog\'lom sabzavot seti. 7 xil sabzavot.',
  8: 'Yuqori sifatli paxta matosidan tikilgan erkaklar ko\'ylagi. Nafas oladigan material, qulay kesim.',
  9: 'Premium denim jinsi shim. Slim fit kesim, 5 cho\'ntak. Mashinada yuvish mumkin.',
  10: 'Sport va kundalik foydalanish uchun qulay oyoq kiyim. Yengil EVA taglik, breathable mesh material.',
  11: '3 o\'rinli zamonaviy divan. Yuqori zichlikdagi ko\'pik, mikrofibra qoplama. Yig\'ib-yoyish mumkin.',
  12: 'Tez qizuvchi elektr choydish. 1.7L sig\'im, 2200W quvvat, avtomatik o\'chish funksiyasi.',
};

const SPECS: Record<number, { label: string; value: string }[]> = {
  1: [
    { label: 'Protsessor', value: 'Apple A17 Pro' },
    { label: 'Ekran', value: '6.1" Super Retina XDR' },
    { label: 'Kamera', value: '48MP + 12MP + 12MP' },
    { label: 'Batareya', value: '3274 mAh' },
    { label: 'Xotira', value: '256GB' },
    { label: 'Rang', value: 'Natural Titanium' },
  ],
  2: [
    { label: 'Protsessor', value: 'Snapdragon 8 Gen 3' },
    { label: 'Ekran', value: '6.8" Dynamic AMOLED' },
    { label: 'Kamera', value: '200MP asosiy' },
    { label: 'Batareya', value: '5000 mAh' },
    { label: 'Xotira', value: '256GB' },
    { label: 'RAM', value: '12GB' },
  ],
};

export function ProductDetailPage({ product, cartQty, onAdd, onBack, onGoCart, onToast }: Props) {
  const [qty, setQty] = useState(1);
  const specs = SPECS[product.id];
  const description = PRODUCT_DESCRIPTIONS[product.id] || `${product.name} - yuqori sifatli mahsulot.`;

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAdd(product);
    onToast(`✓ ${qty} ta savatga qo'shildi`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="header" style={{ padding: '12px 16px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xs)', padding: '8px 12px',
            color: 'var(--text-primary)', cursor: 'pointer', fontSize: 13, fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          Orqaga
        </button>
        {cartQty > 0 && (
          <button
            onClick={onGoCart}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--accent-glow)', border: '1px solid var(--accent)',
              borderRadius: 'var(--radius-xs)', padding: '8px 12px',
              color: 'var(--accent-light)', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            }}
          >
            <ShoppingCart size={16} />
            Savatga ({cartQty})
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="page" style={{ paddingBottom: 120 }}>
        {/* Product image */}
        <div style={{
          margin: '0 16px 16px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 220,
          fontSize: 96,
          position: 'relative',
        }}>
          {product.emoji}
          {discount && (
            <div style={{
              position: 'absolute', top: 12, right: 12,
              background: 'var(--danger)', color: 'white',
              borderRadius: 8, padding: '4px 10px',
              fontSize: 13, fontWeight: 800,
            }}>
              -{discount}%
            </div>
          )}
          {!product.inStock && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.5)',
              borderRadius: 'var(--radius)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, color: 'var(--text-muted)',
            }}>
              Mavjud emas
            </div>
          )}
        </div>

        {/* Main info */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ fontSize: 11, color: 'var(--accent-light)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>
            {product.category}
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.2 }}>
            {product.name}
          </h1>

          {/* Rating (mock) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={14} fill={i <= 4 ? 'var(--warning)' : 'none'} color={i <= 4 ? 'var(--warning)' : 'var(--text-muted)'} />
            ))}
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 2 }}>4.0 (128 ta sharh)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-light)' }}>
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span style={{ fontSize: 16, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Features */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[
              { icon: <Truck size={14} />, label: 'Yetkazib berish' },
              { icon: <Shield size={14} />, label: '1 yil kafolat' },
              { icon: <RotateCcw size={14} />, label: '14 kun qaytarish' },
            ].map((f, i) => (
              <div key={i} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '10px 6px',
                fontSize: 10, color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 600,
              }}>
                <span style={{ color: 'var(--accent-light)' }}>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <div className="section-title" style={{ padding: '0 0 8px' }}>Tavsif</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {description}
            </p>
          </div>

          {/* Specs */}
          {specs && (
            <div style={{ marginBottom: 20 }}>
              <div className="section-title" style={{ padding: '0 0 10px' }}>Xususiyatlar</div>
              <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                {specs.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px',
                    borderBottom: i < specs.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom action bar */}
      {product.inStock && (
        <div style={{
          position: 'fixed', bottom: 'calc(var(--nav-height) + var(--safe-bottom))',
          left: 0, right: 0,
          background: 'rgba(15,15,19,0.95)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          padding: '12px 16px',
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          {/* Qty */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', border: '1px solid var(--border)' }}>
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="qty-value" style={{ minWidth: 24 }}>{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            style={{
              flex: 1, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: 'linear-gradient(135deg, var(--accent), #9d4edd)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}
          >
            <ShoppingCart size={18} />
            {formatPrice(product.price * qty)} — Qo'shish
          </button>
        </div>
      )}
    </div>
  );
}
