// store/cartStore.ts

import { create } from 'zustand';
import api from '@/lib/api'; // Service API yang sudah kita buat
import { Cart } from '@/types'; // Tipe data yang sudah disesuaikan

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isMutating: boolean; // State untuk loading pada saat CUD (Create, Update, Delete)
  error: string | null;
  lastFetchAttempt: number; // Timestamp untuk mencegah fetch berulang
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
}

// Helper untuk mengambil ulang data keranjang dan memperbarui state
const refetchCartAndUpdateState = async (set: (updater: (state: CartState) => Partial<CartState>) => void) => {
  try {
    const response = await api.get('/cart'); // Endpoint dari dokumentasi
    set(state => ({ cart: response.data, isMutating: false, error: null }));
  } catch (err) {
    console.error("Gagal sinkronisasi ulang keranjang:", err);
    set(state => ({ isMutating: false, error: "Gagal menyinkronkan keranjang." }));
  }
};

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
   * Setelah berhasil, panggil fetchCart() untuk mendapatkan state terbaru.
   */
  addToCart: async (productId, quantity) => {
    // Skip jika API calls dinonaktifkan untuk development
    if (process.env.NEXT_PUBLIC_DISABLE_API_CALLS === 'true') {
      console.log("API calls dinonaktifkan, simulasi addToCart berhasil");
      return;
    }

    console.log("Adding to cart:", { product_id: productId, quantity });
    set({ isMutating: true });
    try {
      const response = await api.post('/cart/items', { product_id: productId, quantity });
      console.log("Add to cart response:", response.data);
      // API tidak mengembalikan keranjang utuh, jadi kita panggil ulang
      await get().fetchCart();
    } catch (err) {
      console.error("Gagal menambah item:", err);
      if ((err as any).response?.data?.message) {
        console.error("Server error message:", (err as any).response.data.message);
      }
      set({ isMutating: false, error: "Gagal menambah item ke keranjang." });
      throw err; // Re-throw untuk handling di komponen
    } finally {
        set({isMutating: false})
    }
  },

  /**
   * Mengubah kuantitas item yang sudah ada di keranjang.
   * Setelah berhasil, panggil fetchCart() untuk mendapatkan state terbaru.
   */
  updateItemQuantity: async (itemId, quantity) => {
    // Skip jika API calls dinonaktifkan untuk development
    if (process.env.NEXT_PUBLIC_DISABLE_API_CALLS === 'true') {
      console.log("API calls dinonaktifkan, simulasi updateItemQuantity berhasil");
      return;
    }

    // Jika kuantitas 0 atau kurang, hapus item
    if (quantity <= 0) {
      await get().removeFromCart(itemId);
      return;
    }
    set({ isMutating: true });
    try {
      await api.put(`/cart/items/${itemId}`, { quantity });
      // API tidak mengembalikan keranjang utuh, jadi kita panggil ulang
      await get().fetchCart();
    } catch (err) {
      console.error("Gagal mengubah jumlah item:", err);
      set({ isMutating: false, error: "Gagal mengubah jumlah item." });
    } finally {
        set({isMutating: false})
    }
  },

  /**
   * Menghapus item dari keranjang.
   * Setelah berhasil, panggil fetchCart() untuk mendapatkan state terbaru.
   */
  removeFromCart: async (itemId) => {
    // Skip jika API calls dinonaktifkan untuk development
    if (process.env.NEXT_PUBLIC_DISABLE_API_CALLS === 'true') {
      console.log("API calls dinonaktifkan, simulasi removeFromCart berhasil");
      return;
    }

    set({ isMutating: true });
    try {
      await api.delete(`/cart/items/${itemId}`);
      // API tidak mengembalikan keranjang utuh, jadi kita panggil ulang
      await get().fetchCart();
    } catch (err) {
      console.error("Gagal menghapus item:", err);
      set({ isMutating: false, error: "Gagal menghapus item." });
    } finally {
        set({isMutating: false})
    }
  },

  /**
   * Membersihkan state keranjang di sisi klien saat logout.
   */
  clearCart: () => {
    set({ cart: null, isLoading: false, isMutating: false, error: null, lastFetchAttempt: 0 });
  },
}));