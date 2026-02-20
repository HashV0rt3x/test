import type { CartItem, Order } from '../types';
import { formatPrice } from '../store';

interface Props {
  cart: CartItem[];
  total: number;
  onChangeQty: (id: number, delta: number) => void;
  onCheckout: (order: Order) => void;
  onNavigateCatalog: () => void;
  onToast: (msg: string) => void;
}

export function CartPage({ cart, total, onChangeQty, onCheckout, onNavigateCatalog, onToast }: Props) {
  const delivery = total > 500000 ? 0 : 25000;
  const grandTotal = total + delivery;

  const handleCheckout = () => {
    const order: Order = {
      id: `#${String(Math.floor(Math.random() * 99000) + 1000)}`,
      items: cart.map(i => ({
        emoji: i.product.emoji,
        name: i.product.name,
        qty: i.qty,
        price: i.product.price,
      })),
      total: grandTotal,
      status: 'pending',
      createdAt: new Date(),
    };
    onCheckout(order);
    onToast('🎉 Buyurtma qabul qilindi!');
  };

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="header">
          <span className="header-title">Savat 🛒</span>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <div className="empty-title">Savat bo'sh</div>
          <div className="empty-desc">Hali hech narsa qo'shilmagan. Katalogdan mahsulot tanlang!</div>
          <button
            onClick={onNavigateCatalog}
            style={{
              marginTop: 16,
              padding: '12px 28px',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Katalogga o'tish →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="header">
        <span className="header-title">Savat 🛒</span>
        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{cart.length} ta</span>
      </div>

      <div className="cart-list" style={{ flex: 1 }}>
        {cart.map(item => (
          <div key={item.product.id} className="cart-item fade-up">
            <div className="cart-item-img">{item.product.emoji}</div>
            <div className="cart-item-info">
              <div className="cart-item-name">{item.product.name}</div>
              <div className="cart-item-price">{formatPrice(item.product.price)}</div>
            </div>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => onChangeQty(item.product.id, -1)}>−</button>
              <span className="qty-value">{item.qty}</span>
              <button className="qty-btn" onClick={() => onChangeQty(item.product.id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-summary">
          <div className="cart-row">
            <span className="label">Mahsulotlar</span>
            <span className="value">{formatPrice(total)}</span>
          </div>
          <div className="cart-row">
            <span className="label">Yetkazib berish</span>
            <span className="value" style={{ color: delivery === 0 ? 'var(--success)' : undefined }}>
              {delivery === 0 ? 'Bepul' : formatPrice(delivery)}
            </span>
          </div>
          {delivery === 0 && (
            <div style={{ fontSize: 11, color: 'var(--success)', textAlign: 'right' }}>
              500 000 so'm dan yuqori → yetkazib berish bepul
            </div>
          )}
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div className="cart-row total">
            <span className="label">Jami</span>
            <span className="value">{formatPrice(grandTotal)}</span>
          </div>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Buyurtma berish →
        </button>
      </div>
    </div>
  );
}
