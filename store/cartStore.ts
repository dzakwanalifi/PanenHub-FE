'use client';

import { create } from 'zustand';

// Define all types locally to avoid any import issues
interface CartProduct {
  id: string;
  title: string;
  price: number;
  unit: string;
  store_id: string;
  image_urls?: string[];
  store: {
    store_name: string;
  };
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: CartProduct;
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
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
  fetchCart: () => Promise<void>;
}

// Default empty cart
const defaultCart: Cart = {
  items: [],
  total_price: 0
};

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    // Use the correct localStorage key that matches authStore
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      return parsed.state?.token || null;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return null;
};

// Create the store with explicit typing
const useCartStore = create<CartState>((set, get) => ({
  // Initial State
  cart: defaultCart,
  isLoading: false,
  isMutating: false,
  error: null,

  // Actions
  fetchCart: async () => {
    const token = getAuthToken();
    if (!token) {
      console.log('No auth token, using empty cart');
      set({ cart: defaultCart, isLoading: false, error: null });
      return;
    }

    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.status}`);
      }

      const data = await response.json();
      console.log('Cart fetched successfully:', data);
      set({ cart: data, isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching cart:', error);
      set({ 
        cart: defaultCart, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch cart' 
      });
    }
  },

  addToCart: async (productId: string, quantity: number) => {
    const token = getAuthToken();
    if (!token) {
      set({ error: 'Please login to add items to cart' });
      return;
    }

    set({ isMutating: true, error: null });
    
    try {
      const response = await fetch('/api/cart/items', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add item to cart: ${response.status}`);
      }

      const data = await response.json();
      console.log('Item added to cart successfully:', data);
      
      // Refresh cart after adding item
      await get().fetchCart();
      set({ isMutating: false, error: null });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      set({ 
        isMutating: false, 
        error: error instanceof Error ? error.message : 'Failed to add item to cart' 
      });
    }
  },

  updateItemQuantity: async (itemId: string, quantity: number) => {
    const token = getAuthToken();
    if (!token) {
      set({ error: 'Please login to update cart' });
      return;
    }

    set({ isMutating: true, error: null });
    
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update item quantity: ${response.status}`);
      }

      // Refresh cart after updating
      await get().fetchCart();
      set({ isMutating: false, error: null });
    } catch (error) {
      console.error('Error updating item quantity:', error);
      set({ 
        isMutating: false, 
        error: error instanceof Error ? error.message : 'Failed to update item quantity' 
      });
    }
  },

  removeFromCart: async (itemId: string) => {
    const token = getAuthToken();
    if (!token) {
      set({ error: 'Please login to remove items from cart' });
      return;
    }

    set({ isMutating: true, error: null });
    
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to remove item from cart: ${response.status}`);
      }

      // Refresh cart after removing item
      await get().fetchCart();
      set({ isMutating: false, error: null });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      set({ 
        isMutating: false, 
        error: error instanceof Error ? error.message : 'Failed to remove item from cart' 
      });
    }
  },

  clearCart: () => {
    set({ cart: defaultCart });
  },
}));

export { useCartStore };
export type { CartItem, Cart, CartProduct };
