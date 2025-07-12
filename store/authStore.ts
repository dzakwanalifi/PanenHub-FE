// store/authStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import { setApiToken } from '@/lib/api';

// Definisikan tipe untuk data pengguna dan state
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  joinDate?: string;
  isSeller?: boolean;
  // tambahkan properti lain sesuai data dari API Anda
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Buat store dengan middleware 'persist'
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // --- Initial State ---
      token: null,
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      // --- Actions ---

      // Fungsi untuk LOGIN menggunakan Supabase Auth
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            throw new Error(error.message);
          }

          if (data.session && data.user) {
            const token = data.session.access_token;
            const user: User = {
              id: data.user.id,
              name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || '',
              email: data.user.email || '',
              phone: data.user.user_metadata?.phone,
              address: data.user.user_metadata?.address,
              avatar: data.user.user_metadata?.avatar_url,
              joinDate: data.user.created_at,
              isSeller: data.user.user_metadata?.is_seller || false,
            };

            // Set token to API instance
            setApiToken(token);

            // Simpan token dan data user ke state
            set({ 
              token, 
              user, 
              isLoggedIn: true, 
              isLoading: false 
            });
          }

        } catch (err: any) {
          const errorMessage = err.message || "Email atau password salah.";
          set({ 
            error: errorMessage, 
            isLoading: false 
          });
          // Lempar error agar bisa ditangani di komponen/halaman
          throw new Error(errorMessage);
        }
      },

      // Fungsi untuk REGISTER menggunakan Supabase Auth
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
              data: {
                name: data.name,
              },
            },
          });

          if (error) {
            throw new Error(error.message);
          }

          if (authData.session && authData.user) {
            const token = authData.session.access_token;
            const user: User = {
              id: authData.user.id,
              name: data.name,
              email: authData.user.email || '',
              phone: authData.user.user_metadata?.phone,
              address: authData.user.user_metadata?.address,
              avatar: authData.user.user_metadata?.avatar_url,
              joinDate: authData.user.created_at,
              isSeller: false,
            };
            
            // Set token to API instance
            setApiToken(token);
            
            set({ token, user, isLoggedIn: true, isLoading: false });
          } else {
            // Email confirmation required
            set({ 
              isLoading: false,
              error: "Please check your email to confirm your account."
            });
          }

        } catch (err: any) {
          const errorMessage = err.message || "Gagal melakukan registrasi.";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      // Fungsi untuk LOGOUT
      logout: async () => {
        try {
          await supabase.auth.signOut();
        } catch (error) {
          console.error('Error signing out:', error);
        }
        
        // Clear token from API instance
        setApiToken(null);
        
        // Hapus semua state otentikasi
        set({ 
          token: null, 
          user: null, 
          isLoggedIn: false, 
          error: null 
        });
      },

      // Fungsi untuk clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage', // nama item di localStorage
      storage: createJSONStorage(() => localStorage),
      // Hanya simpan data ini di localStorage, jangan simpan error atau loading state
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user, 
        isLoggedIn: state.isLoggedIn 
      }),
      // Prevent hydration issues
      skipHydration: false,
      // Initialize token when store is rehydrated
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log('An error occurred during hydration:', error);
          return;
        }
        
        if (state?.token) {
          setApiToken(state.token);
        }
      },
    }
  )
);