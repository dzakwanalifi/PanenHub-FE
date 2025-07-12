// store/cartStore.ts

import { create } from 'zustand';
import api from '@/lib/api';
import { Cart, CartItem, AddToCartRequest, UpdateCartItemRequest } from '@/types';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void; // Untuk membersihkan state saat logout
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  // --- Initial State ---
  cart: null,
  isLoading: false,
  error: null,

  // --- Actions ---

  // 1. Mengambil data keranjang dari server
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/cart');
      set({ cart: response.data, isLoading: false, error: null });
    } catch (err: any) {
      console.error("Gagal mengambil data keranjang:", err);
      // Jika error 404 (cart tidak ada), buat cart kosong
      if (err.response?.status === 404) {
        set({ 
          cart: { 
            id: '', 
            items: [], 
            totalPrice: 0, 
            totalItems: 0, 
            userId: '' 
          }, 
          isLoading: false, 
          error: null 
        });
      } else {
        set({ isLoading: false, error: "Gagal memuat keranjang." });
      }
    }
  },

  // 2. Menambah item ke keranjang
  addToCart: async (productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const requestData: AddToCartRequest = { productId, quantity };
      const response = await api.post('/cart/add', requestData);
      set({ cart: response.data, isLoading: false, error: null });
    } catch (err: any) {
      console.error("Gagal menambah item:", err);
      set({ isLoading: false, error: "Gagal menambah item ke keranjang." });
      throw err; // Re-throw untuk handling di komponen
    }
  },
  
  // 3. Mengubah jumlah item
  updateItemQuantity: async (itemId, quantity) => {
    if (quantity <= 0) {
      // Jika quantity 0 atau negatif, hapus item
      return get().removeFromCart(itemId);
    }

    set({ isLoading: true, error: null });
    
    // Optimistic UI: update state lokal dulu untuk responsivitas
    const currentCart = get().cart;
    if (currentCart) {
      const updatedItems = currentCart.items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      const newTotalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      set({ 
        cart: { 
          ...currentCart, 
          items: updatedItems,
          totalItems: newTotalItems,
          totalPrice: newTotalPrice
        }
      });
    }

    try {
      const requestData: UpdateCartItemRequest = { quantity };
      const response = await api.put(`/cart/items/${itemId}`, requestData);
      // Sinkronkan kembali dengan data dari server
      set({ cart: response.data, isLoading: false, error: null });
    } catch (err: any) {
      console.error("Gagal mengubah jumlah item:", err);
      set({ isLoading: false, error: "Gagal mengubah jumlah item." });
      // Jika gagal, panggil fetchCart() untuk mengembalikan ke state semula
      get().fetchCart(); 
    }
  },

  // 4. Menghapus item dari keranjang
  removeFromCart: async (itemId) => {
    set({ isLoading: true, error: null });
    
    // Optimistic UI: hapus item dari state lokal dulu
    const currentCart = get().cart;
    if (currentCart) {
      const updatedItems = currentCart.items.filter(item => item.id !== itemId);
      const newTotalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      set({ 
        cart: { 
          ...currentCart, 
          items: updatedItems,
          totalItems: newTotalItems,
          totalPrice: newTotalPrice
        }
      });
    }

    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      set({ cart: response.data, isLoading: false, error: null });
    } catch (err: any) {
      console.error("Gagal menghapus item:", err);
      set({ isLoading: false, error: "Gagal menghapus item." });
      // Jika gagal, panggil fetchCart() untuk mengembalikan ke state semula
      get().fetchCart();
    }
  },

  // 5. Membersihkan keranjang saat logout
  clearCart: () => {
    set({ cart: null, isLoading: false, error: null });
  },

  // 6. Helper functions untuk backward compatibility
  getTotal: () => {
    const { cart } = get();
    return cart?.totalPrice || 0;
  },

  getItemCount: () => {
    const { cart } = get();
    return cart?.totalItems || 0;
  },
}));

// Legacy interface untuk backward compatibility
export interface LegacyCartItem {
  id: string;
  cartItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
}