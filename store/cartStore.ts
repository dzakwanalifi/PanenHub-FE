import { create } from 'zustand';

export interface CartItem {
  id: string;
  cartItemId: string; // Unique ID for each cart entry
  name: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity' | 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      // Generate unique cartItemId for new items
      const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        items: [...state.items, { ...item, cartItemId, quantity: 1 }],
      };
    }),
  removeItem: (cartItemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.cartItemId !== cartItemId),
    })),
  updateQuantity: (cartItemId, quantity) =>
    set((state) => ({
      items: quantity <= 0 
        ? state.items.filter((item) => item.cartItemId !== cartItemId)
        : state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
    })),
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));