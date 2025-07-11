import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers, MockUser } from '@/lib/mock-data';

interface AuthState {
  isLoggedIn: boolean;
  user: MockUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      
      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find user by email (password is ignored for prototype)
        const user = mockUsers.find(u => u.email === email);
        
        if (user) {
          set({ isLoggedIn: true, user });
          return { success: true };
        } else {
          return { success: false, error: 'Invalid email or password' };
        }
      },
      
      logout: () => {
        set({ isLoggedIn: false, user: null });
      },
      
      register: async (name: string, email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          return { success: false, error: 'User with this email already exists' };
        }
        
        // Create new user (in real app, this would be sent to backend)
        const newUser: MockUser = {
          id: `user${Date.now()}`,
          name,
          email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
          joinDate: new Date().toLocaleDateString(),
          isSeller: false
        };
        
        // Add to mock users (this won't persist in real prototype, but simulates the flow)
        mockUsers.push(newUser);
        
        set({ isLoggedIn: true, user: newUser });
        return { success: true };
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        isLoggedIn: state.isLoggedIn, 
        user: state.user 
      }),
    }
  )
);