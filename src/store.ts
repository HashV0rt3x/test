import { useState, useCallback } from 'react';
import type { CartItem, Order, Product } from './types';

// Mock data
export const CATEGORIES = [
  { id: 'all', label: 'Barchasi', emoji: '🛍️' },
  { id: 'electronics', label: 'Elektronika', emoji: '📱' },
  { id: 'food', label: 'Oziq-ovqat', emoji: '🍎' },
  { id: 'clothing', label: 'Kiyim', emoji: '👕' },
  { id: 'home', label: 'Uy-ro\'zg\'or', emoji: '🏠' },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'iPhone 15 Pro', price: 13500000, oldPrice: 14999000, emoji: '📱', category: 'electronics', inStock: true },
  { id: 2, name: 'Samsung Galaxy S24', price: 11200000, emoji: '📲', category: 'electronics', inStock: true },
  { id: 3, name: 'AirPods Pro 2', price: 3800000, oldPrice: 4200000, emoji: '🎧', category: 'electronics', inStock: true },
  { id: 4, name: 'MacBook Air M3', price: 22000000, emoji: '💻', category: 'electronics', inStock: false },
  { id: 5, name: 'Olma (1 kg)', price: 12000, emoji: '🍎', category: 'food', inStock: true },
  { id: 6, name: 'Non (dona)', price: 4500, emoji: '🍞', category: 'food', inStock: true },
  { id: 7, name: 'Yangi sabzavotlar seti', price: 35000, oldPrice: 45000, emoji: '🥦', category: 'food', inStock: true },
  { id: 8, name: 'Ko\'ylak Erkaklar', price: 185000, emoji: '👕', category: 'clothing', inStock: true },
  { id: 9, name: 'Jinsi shim', price: 320000, oldPrice: 380000, emoji: '👖', category: 'clothing', inStock: true },
  { id: 10, name: 'Sport oyoq kiyim', price: 450000, emoji: '👟', category: 'clothing', inStock: true },
  { id: 11, name: 'Diван 3-o\'rinli', price: 4500000, emoji: '🛋️', category: 'home', inStock: true },
  { id: 12, name: 'Elektr choydish', price: 380000, oldPrice: 420000, emoji: '☕', category: 'home', inStock: true },
];

const MOCK_ORDERS: Order[] = [
  {
    id: '#00124',
    items: [
      { emoji: '📱', name: 'iPhone 15 Pro', qty: 1, price: 13500000 },
      { emoji: '🎧', name: 'AirPods Pro 2', qty: 1, price: 3800000 },
    ],
    total: 17300000,
    status: 'delivered',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '#00123',
    items: [
      { emoji: '🍎', name: 'Olma (1 kg)', qty: 3, price: 12000 },
      { emoji: '🍞', name: 'Non (dona)', qty: 2, price: 4500 },
    ],
    total: 45000,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const changeQty = useCallback((productId: number, delta: number) => {
    setCart(prev => {
      return prev
        .map(i => i.product.id === productId ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0);
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const total = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return { cart, addToCart, removeFromCart, changeQty, clearCart, total, count };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
  }, []);

  return { orders, addOrder };
}

export function formatPrice(price: number): string {
  return price.toLocaleString('uz-UZ') + ' so\'m';
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getStatusLabel(status: Order['status']): string {
  const map = {
    pending: 'Kutilmoqda',
    confirmed: 'Tasdiqlandi',
    delivered: 'Yetkazildi',
    cancelled: 'Bekor qilindi',
  };
  return map[status];
}
