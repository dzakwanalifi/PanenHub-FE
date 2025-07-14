// Mock authentication for development when Supabase is unavailable

export const createMockUser = () => ({
  id: 'mock-user-123',
  name: 'Development User',
  email: 'dev@panenhub.com',
  phone: '08123456789',
  avatar: null,
  joinDate: new Date().toISOString(),
  isSeller: false,
});

export const createMockSession = () => ({
  access_token: 'mock-access-token-' + Date.now(),
  refresh_token: 'mock-refresh-token-' + Date.now(),
  expires_in: 3600,
  expires_at: Date.now() + 3600000,
  user: createMockUser(),
});

export const mockSupabaseAuth = {
  signInWithPassword: async (credentials: { email: string; password: string }) => {
    console.log('Mock login with:', credentials.email);
    
    if (credentials.email === 'test@test.com' && credentials.password === 'password') {
      const session = createMockSession();
      return {
        data: {
          session,
          user: session.user
        },
        error: null
      };
    }
    
    return {
      data: { session: null, user: null },
      error: { message: 'Invalid login credentials' }
    };
  },

  signUp: async (data: { email: string; password: string; options?: any }) => {
    console.log('Mock signup with:', data.email);
    const session = createMockSession();
    return {
      data: {
        session,
        user: { ...session.user, ...data.options?.data }
      },
      error: null
    };
  },

  signOut: async () => {
    console.log('Mock logout');
    return { error: null };
  },

  refreshSession: async () => {
    console.log('Mock refresh session');
    const session = createMockSession();
    return {
      data: { session },
      error: null
    };
  },

  getUser: async (token?: string) => {
    console.log('Mock get user with token:', token?.substring(0, 20));
    if (token && token.startsWith('mock-access-token')) {
      return {
        data: { user: createMockUser() },
        error: null
      };
    }
    return {
      data: { user: null },
      error: { message: 'Invalid token' }
    };
  }
};
