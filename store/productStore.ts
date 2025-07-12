import { create } from 'zustand';
import { Product } from '@/types';
import api from '@/lib/api';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  // Actions
  fetchSellerProducts: () => Promise<void>;
  createProduct: (formData: FormData) => Promise<Product>;
  updateProduct: (productId: string, formData: FormData) => Promise<Product>;
  deleteProduct: (productId: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchSellerProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/seller/products');
      set({ products: response.data, isLoading: false });
    } catch (err) {
      console.error('Failed to fetch seller products:', err);
      set({ error: 'Failed to load products', isLoading: false });
    }
  },

  createProduct: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/seller/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newProduct = response.data;
      set(state => ({
        products: [...state.products, newProduct],
        isLoading: false,
      }));
      return newProduct;
    } catch (err) {
      console.error('Failed to create product:', err);
      set({ error: 'Failed to create product', isLoading: false });
      throw err;
    }
  },

  updateProduct: async (productId: string, formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/seller/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedProduct = response.data;
      set(state => ({
        products: state.products.map(p => 
          p.id === productId ? updatedProduct : p
        ),
        isLoading: false,
      }));
      return updatedProduct;
    } catch (err) {
      console.error('Failed to update product:', err);
      set({ error: 'Failed to update product', isLoading: false });
      throw err;
    }
  },

  deleteProduct: async (productId: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/seller/products/${productId}`);
      set(state => ({
        products: state.products.filter(p => p.id !== productId),
        isLoading: false,
      }));
    } catch (err) {
      console.error('Failed to delete product:', err);
      set({ error: 'Failed to delete product', isLoading: false });
      throw err;
    }
  },
})); 