// store/cartStore.ts

import { create } from 'zustand';
import api from '@/lib/api';
import { Cart } from '@/types';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  lastFetchAttempt: number;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  // --- Initial State ---
  cart: null,
  isLoading: false,   // Loading untuk pengambilan data awal
  isMutating: false,  // Loading untuk aksi tambah/ubah/hapus
  error: null,
  lastFetchAttempt: 0,

  // --- Actions ---

  /**
   * Mengambil data keranjang utuh dari server.
   * Dipanggil saat login atau saat perlu sinkronisasi penuh.
   */
  fetchCart: async () => {
    // Skip jika API calls dinonaktifkan untuk development
    if (process.env.NEXT_PUBLIC_DISABLE_API_CALLS === 'true') {
      console.log("API calls dinonaktifkan, menggunakan cart kosong");
      set({ cart: { items: [], total_price: 0 }, isLoading: false, error: null });
      return;
    }

    // Check if user is authenticated before making API call
    try {
      // Import authStore secara static untuk menghindari webpack issues
      const authState = typeof window !== 'undefined' ? 
        JSON.parse(localStorage.getItem('auth-store') || '{"state":{"isLoggedIn":false}}') : 
        { state: { isLoggedIn: false } };
      
      if (!authState.state?.isLoggedIn) {
        console.log("User not authenticated, skipping cart fetch");
        set({ cart: { items: [], total_price: 0 }, isLoading: false, error: null });
        return;
      }
    } catch (error) {
      console.warn("Could not check auth state, proceeding with cart fetch");
    }

    const now = Date.now();
    const lastAttempt = get().lastFetchAttempt;
    
    // Mencegah fetch berulang dalam 2 detik (dikurangi dari 5 detik)
    if (now - lastAttempt < 2000) {
      console.log("Fetch cart dibatalkan - terlalu cepat dari attempt sebelumnya");
      return;
    }

    // Skip jika API base URL tidak tersedia (development mode)
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      console.warn("API base URL tidak tersedia, menggunakan cart kosong");
      set({ cart: { items: [], total_price: 0 }, isLoading: false, error: null });
      return;
    }

    console.log("Fetching cart from API...");
    set({ isLoading: true, lastFetchAttempt: now });
    
    try {
      const response = await api.get('/cart');
      console.log("Cart fetch berhasil:", response.data);
      set({ cart: response.data, isLoading: false, error: null });
    } catch (err) {
      console.error("Gagal mengambil data keranjang:", err);
      // Jika error 404 (Not Found), mungkin keranjang memang kosong
      if ((err as any).response?.status === 404) {
        set({ cart: { items: [], total_price: 0 }, isLoading: false, error: null });
      } else if ((err as any).response?.status === 401) {
        // Jika 401 (Unauthorized), jangan set error untuk mencegah loop
        // Biarkan auth interceptor menangani redirect
        set({ cart: null, isLoading: false, error: null });
      } else if ((err as any).code === 'ECONNREFUSED' || (err as any).code === 'NETWORK_ERROR') {
        // Jika tidak bisa connect ke server, gunakan cart kosong
        set({ cart: { items: [], total_price: 0 }, isLoading: false, error: null });
      } else {
        console.error("Cart fetch error:", err);
        set({ isLoading: false, error: "Gagal memuat keranjang." });
      }
    }
  },

  /**
   * Menambah item baru ke keranjang.
   * Menggunakan optimistic updates untuk UI responsif.
   */
  addToCart: async (productId, quantity) => {
    if (process.env.NEXT_PUBLIC_DISABLE_API_CALLS === 'true') {
      console.log("API calls dinonaktifkan, simulasi addToCart berhasil");
      return;
    }

    console.log("Adding to cart:", { product_id: productId, quantity });
    
    set({ isMutating: true, error: null });
    
    try {
      const response = await api.post('/cart/items', { product_id: productId, quantity });
      console.log("Add to cart response:", response.data);
      
      // Simple success - just mark as not mutating
      set({ isMutating: false });
      
      // Optionally refetch cart data
      try {
        const cartResponse = await api.get('/cart');
        set({ cart: cartResponse.data });
      } catch (fetchErr) {
        console.warn("Failed to fetch updated cart:", fetchErr);
      }

    } catch (err) {
      console.error("Gagal menambah item:", err);
      set({ isMutating: false, error: "Gagal menambah item ke keranjang." });
      throw err;
    }
  },

  /**
   * Mengubah kuantitas item yang sudah ada di keranjang.
   * Setelah berhasil, panggil fetchCart() untuk mendapatkan state terbaru.
   */
  updateItemQuantity: async (itemId, quantity) => {
    if (process.env.NEXT_PUBLIC_DISABLE_API_CALLS === 'true') {
      console.log("API calls dinonaktifkan, simulasi updateItemQuantity berhasil");
      return;
    }

    if (quantity <= 0) {
      await get().removeFromCart(itemId);
      return;
    }
    
    set({ isMutating: true });
    try {
      await api.put(`/cart/items/${itemId}`, { quantity });
      set({ isMutating: false });
      
      // Fetch updated cart
      const cartResponse = await api.get('/cart');
      set({ cart: cartResponse.data });
    } catch (err) {
      console.error("Gagal mengubah jumlah item:", err);
      set({ isMutating: false, error: "Gagal mengubah jumlah item." });
    }
  },

  removeFromCart: async (itemId) => {
    if (process.env.NEXT_PUBLIC_DISABLE_API_CALLS === 'true') {
      console.log("API calls dinonaktifkan, simulasi removeFromCart berhasil");
      return;
    }

    set({ isMutating: true });
    try {
      await api.delete(`/cart/items/${itemId}`);
      set({ isMutating: false });
      
      // Fetch updated cart
      const cartResponse = await api.get('/cart');
      set({ cart: cartResponse.data });
    } catch (err) {
      console.error("Gagal menghapus item:", err);
      set({ isMutating: false, error: "Gagal menghapus item." });
    }
  },

  /**
   * Membersihkan keranjang (misalnya setelah logout atau checkout).
   */
  clearCart: () => {
    set({ cart: null, isLoading: false, isMutating: false, error: null, lastFetchAttempt: 0 });
  },
}));

// Add event listeners untuk auth events dari authStore
if (typeof window !== 'undefined') {
  // Listen untuk login/register success
  window.addEventListener('auth-login-success', () => {
    setTimeout(() => {
      useCartStore.getState().fetchCart();
    }, 100);
  });

  // Listen untuk rehydration success
  window.addEventListener('auth-rehydration-success', () => {
    setTimeout(() => {
      useCartStore.getState().fetchCart();
    }, 100);
  });

  // Listen untuk logout
  window.addEventListener('auth-logout', () => {
    useCartStore.getState().clearCart();
  });
}