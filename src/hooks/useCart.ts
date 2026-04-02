import { useSyncExternalStore } from 'react';
import { cartStore, CartItem } from '@/data/cart';

export function useCart() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    () => cartStore.getItems()
  );

  return {
    items,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clear: cartStore.clear,
    total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    count: items.reduce((sum, i) => sum + i.quantity, 0),
  };
}
