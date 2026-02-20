import { useState, useCallback } from 'react';
import { ShoppingBag, ShoppingCart, Package } from 'lucide-react';
import type { Page, Order, Product } from './types';
import { useCart, useOrders } from './store';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import './index.css';

function App() {
  const [page, setPage] = useState<Page>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { cart, addToCart, changeQty, clearCart, total, count } = useCart();
  const { orders, addOrder } = useOrders();

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleCheckout = useCallback((order: Order) => {
    addOrder(order);
    clearCart();
    setPage('orders');
  }, [addOrder, clearCart]);

  const openProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setPage('product-detail');
  }, []);

  const isNavPage = page !== 'product-detail';
  const cartQtyForProduct = selectedProduct
    ? (cart.find(i => i.product.id === selectedProduct.id)?.qty ?? 0)
    : 0;

  return (
    <div className="app">
      {toast && <div className="toast">{toast}</div>}

      <div className="page">
        {page === 'catalog' && (
          <CatalogPage
            cart={cart}
            onAdd={addToCart}
            onToast={showToast}
            onOpenProduct={openProduct}
          />
        )}

        {page === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            cartQty={cartQtyForProduct}
            onAdd={addToCart}
            onBack={() => setPage('catalog')}
            onGoCart={() => setPage('cart')}
            onToast={showToast}
          />
        )}

        {page === 'cart' && (
          <CartPage
            cart={cart}
            total={total}
            onChangeQty={changeQty}
            onCheckout={handleCheckout}
            onNavigateCatalog={() => setPage('catalog')}
            onToast={showToast}
          />
        )}

        {page === 'orders' && (
          <OrdersPage
            orders={orders}
            onNavigateCatalog={() => setPage('catalog')}
          />
        )}
      </div>

      {isNavPage && (
        <nav className="bottom-nav">
          <button
            className={`nav-item ${page === 'catalog' ? 'active' : ''}`}
            onClick={() => setPage('catalog')}
          >
            <div className="nav-icon">
              <ShoppingBag size={22} />
            </div>
            <span className="nav-label">Katalog</span>
          </button>

          <button
            className={`nav-item ${page === 'cart' ? 'active' : ''}`}
            onClick={() => setPage('cart')}
          >
            <div className="nav-icon">
              <ShoppingCart size={22} />
              {count > 0 && <span className="nav-badge">{count > 9 ? '9+' : count}</span>}
            </div>
            <span className="nav-label">Savat</span>
          </button>

          <button
            className={`nav-item ${page === 'orders' ? 'active' : ''}`}
            onClick={() => setPage('orders')}
          >
            <div className="nav-icon">
              <Package size={22} />
              {orders.some(o => o.status === 'pending') && <span className="nav-badge">!</span>}
            </div>
            <span className="nav-label">Buyurtmalar</span>
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
