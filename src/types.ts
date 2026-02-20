export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  emoji: string;
  category: string;
  description?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Order {
  id: string;
  items: { emoji: string; name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: Date;
  address?: string;
}

export type Page = 'catalog' | 'product-detail' | 'cart' | 'orders';
