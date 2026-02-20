import type { Order } from '../types';
import { formatPrice, formatDate, getStatusLabel } from '../store';

interface Props {
  orders: Order[];
  onNavigateCatalog: () => void;
}

export function OrdersPage({ orders, onNavigateCatalog }: Props) {
  if (orders.length === 0) {
    return (
      <>
        <div className="header">
          <span className="header-title">Buyurtmalar 📦</span>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <div className="empty-title">Buyurtmalar yo'q</div>
          <div className="empty-desc">Hali birorta buyurtma bermaganingiz. Xarid boshlang!</div>
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
            Xarid qilish →
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="header">
        <span className="header-title">Buyurtmalar 📦</span>
        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{orders.length} ta</span>
      </div>

      <div className="orders-list">
        {orders.map((order, i) => (
          <div key={order.id} className="order-card fade-up" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="order-header">
              <span className="order-id">{order.id}</span>
              <span className={`order-status status-${order.status}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>

            <div className="order-items-preview">
              {order.items.map((item, j) => (
                <span key={j} title={item.name}>{item.emoji}</span>
              ))}
            </div>

            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>
              {order.items.map((item, j) => (
                <span key={j}>
                  {item.name} × {item.qty}
                  {j < order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>

            <div className="order-footer">
              <span className="order-date">{formatDate(order.createdAt)}</span>
              <span className="order-total">{formatPrice(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
