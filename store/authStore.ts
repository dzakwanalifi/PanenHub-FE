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

interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatar?: string;
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
  refreshToken: () => Promise<boolean>;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
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
            console.log('Login successful, token set:', token.substring(0, 20) + '...');

            // Simpan token dan data user ke state
            set({ 
              token, 
              user, 
              isLoggedIn: true, 
              isLoading: false 
            });

            // PANGGIL FETCH CART SETELAH LOGIN SUKSES
            // Trigger cart fetch via localStorage event untuk menghindari circular dependency
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('auth-login-success'));
              }
            }, 100);
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

            // PANGGIL FETCH CART SETELAH REGISTER SUKSES
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('auth-login-success'));
              }
            }, 100);
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
        
        // PANGGIL CLEAR CART SAAT LOGOUT
        // Trigger cart clear via localStorage event untuk menghindari circular dependency
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-logout'));
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

      // Fungsi untuk update profile
      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          // Use fetch instead of dynamic import untuk menghindari webpack issues
          const token = get().token;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
          });
          
          if (!response.ok) throw new Error('Failed to update profile');
          const result = await response.json();
          
          if (result && result.user) {
            // Update user state dengan data terbaru
            set({ 
              user: result.user,
              isLoading: false 
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error: any) {
          console.error('Error updating profile:', error);
          set({ 
            error: error.response?.data?.message || 'Gagal mengupdate profile',
            isLoading: false 
          });
          throw error;
        }
      },

      // Fungsi untuk refresh token
      refreshToken: async () => {
        try {
          const { data, error } = await supabase.auth.refreshSession();
          if (error) {
            console.error('Refresh session error:', error);
            throw error;
          }

          if (data.session && data.session.access_token) {
            const token = data.session.access_token;
            const user: User = {
              id: data.session.user.id,
              name: data.session.user.user_metadata?.name || data.session.user.email?.split('@')[0] || '',
              email: data.session.user.email || '',
              phone: data.session.user.user_metadata?.phone,
              address: data.session.user.user_metadata?.address,
              avatar: data.session.user.user_metadata?.avatar_url,
              joinDate: data.session.user.created_at,
              isSeller: data.session.user.user_metadata?.is_seller || false,
            };

            setApiToken(token);
            console.log('Token refreshed, new token set:', token.substring(0, 20) + '...');
            set({ token, user, isLoggedIn: true, error: null });
            return true;
          }
          
          console.warn('No session returned from refresh');
          return false;
        } catch (error: any) {
          console.error('Token refresh failed:', error);
          
          // Check if it's a network error
          const isNetworkError = error.message?.includes('Failed to fetch') || 
                                error.code === 'NETWORK_ERROR' ||
                                error.message?.includes('ERR_NAME_NOT_RESOLVED') ||
                                !navigator.onLine;
          
          if (isNetworkError) {
            console.log('Network error during token refresh, will retry later');
            // Don't clear auth state for network errors, just return false
            return false;
          }
          
          // Clear auth state only for actual auth errors
          setApiToken(null);
          set({ 
            token: null, 
            user: null, 
            isLoggedIn: false, 
            error: null 
          });
          return false;
        }
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
          // Validate token with Supabase before setting it
          supabase.auth.getUser(state.token).then(({ data, error }) => {
            if (error || !data.user) {
              console.log('Token validation failed:', error?.message || 'No user data');
              
              // Check if it's a network error or token expired
              const isNetworkError = error?.message?.includes('Failed to fetch') || 
                                    error?.message?.includes('ERR_NAME_NOT_RESOLVED') ||
                                    !navigator.onLine;
              
              const isTokenExpired = error?.message?.includes('expired') ||
                                   error?.message?.includes('invalid claims');
              
              if (isNetworkError) {
                console.log('Network error during token validation, keeping current auth state');
                // Keep the current token, don't clear auth state
                setApiToken(state.token);
                return;
              }
              
              if (isTokenExpired) {
                console.log('Token expired, attempting refresh...');
                // Try to refresh the token automatically
                useAuthStore.getState().refreshToken().then((success) => {
                  if (!success) {
                    console.log('Token refresh failed, clearing auth state');
                    useAuthStore.setState({ 
                      token: null, 
                      user: null, 
                      isLoggedIn: false, 
                      error: null 
                    });
                  }
                });
                return;
              }
              
              // Clear expired token only for actual auth errors
              setApiToken(null);
              useAuthStore.setState({ 
                token: null, 
                user: null, 
                isLoggedIn: false, 
                error: null 
              });
            } else {
              console.log('Token valid, setting API token');
              setApiToken(state.token);
              // PANGGIL FETCH CART SETELAH REHYDRATION
              // Trigger cart fetch via event untuk menghindari circular dependency
              setTimeout(() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('auth-rehydration-success'));
                }
              }, 200);
            }
          }).catch((err) => {
            console.error('Error validating token:', err);
            
            // Check if it's a network error
            const isNetworkError = err.message?.includes('Failed to fetch') || 
                                  err.message?.includes('ERR_NAME_NOT_RESOLVED') ||
                                  !navigator.onLine;
            
            if (isNetworkError) {
              console.log('Network error during token validation, keeping current auth state');
              // Keep the current token, don't clear auth state
              setApiToken(state.token);
              return;
            }
            
            // Clear expired token only for actual errors
            setApiToken(null);
            useAuthStore.setState({ 
              token: null, 
              user: null, 
              isLoggedIn: false, 
              error: null 
            });
          });
        }
      },
    }
  )
);