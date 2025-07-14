// store/cartStore.ts - Ultra-simplified version untuk fix webpack error

import { create } from 'zustand';

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Cart {
  items: CartItem[];
  total_price: number;
}

interface CartState {
  cart: Cart;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  fetchCart: () => void;
}

// Default empty cart
const defaultCart: Cart = {
  items: [],
  total_price: 0
};

export const useCartStore = create<CartState>((set, get) => ({
  // --- Initial State ---
  cart: defaultCart,
  isLoading: false,
  isMutating: false,
  error: null,

  // --- Synchronous Actions untuk avoid webpack issues ---
  fetchCart: () => {
    console.log('Fetching cart...');
    set({ cart: defaultCart, isLoading: false, error: null });
  },

  addToCart: (productId: string, quantity: number) => {
    console.log(`Adding product ${productId} to cart with quantity ${quantity}`);
    
    const currentCart = get().cart;
    const existingItem = currentCart.items.find(item => item.product_id === productId);
    
    if (existingItem) {
      // Update existing item
      const updatedItems = currentCart.items.map(item =>
        item.product_id === productId 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      set({ 
        cart: { items: updatedItems, total_price: newTotal }
      });
    } else {
      // Add new item (dengan mock data)
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        product_id: productId,
        name: `Product ${productId}`,
        price: 25000,
        quantity,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'
      };
      const updatedItems = [...currentCart.items, newItem];
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      set({ 
        cart: { items: updatedItems, total_price: newTotal }
      });
    }
  },

  updateItemQuantity: (itemId: string, quantity: number) => {
    const currentCart = get().cart;
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      get().removeFromCart(itemId);
      return;
    }
    
    const updatedItems = currentCart.items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    set({ 
      cart: { items: updatedItems, total_price: newTotal }
    });
  },

  removeFromCart: (itemId: string) => {
    const currentCart = get().cart;
    const updatedItems = currentCart.items.filter(item => item.id !== itemId);
    const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    set({ 
      cart: { items: updatedItems, total_price: newTotal }
    });
  },

  clearCart: () => {
    set({ cart: defaultCart });
  },
}));
