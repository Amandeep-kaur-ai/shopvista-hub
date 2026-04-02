import { create } from 'zustand';
import { Product } from './products';

// Simple cart state without zustand - using React context pattern instead
export interface CartItem {
  product: Product;
  quantity: number;
}

// We'll use a simple global state with event-based updates
let cartItems: CartItem[] = [];
let listeners: Array<() => void> = [];

function notifyListeners() {
  listeners.forEach(l => l());
}

export const cartStore = {
  getItems: () => cartItems,
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => { listeners = listeners.filter(l => l !== listener); };
  },
  addItem: (product: Product, quantity = 1) => {
    const existing = cartItems.find(i => i.product.id === product.id);
    if (existing) {
      cartItems = cartItems.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
    } else {
      cartItems = [...cartItems, { product, quantity }];
    }
    notifyListeners();
  },
  removeItem: (productId: number) => {
    cartItems = cartItems.filter(i => i.product.id !== productId);
    notifyListeners();
  },
  updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) {
      cartItems = cartItems.filter(i => i.product.id !== productId);
    } else {
      cartItems = cartItems.map(i => i.product.id === productId ? { ...i, quantity } : i);
    }
    notifyListeners();
  },
  clear: () => {
    cartItems = [];
    notifyListeners();
  },
  getTotal: () => cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  getCount: () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
};
