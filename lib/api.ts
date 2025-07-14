import axios from 'axios';
import { safeRedirect, isOnLoginPage, isOnPublicPage } from './auth-utils';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Variable to store the current token
let currentToken: string | null = null;

// Function to set the token (will be called by the auth store)
export const setApiToken = (token: string | null) => {
  currentToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Interceptor untuk error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 unauthorized responses
    if (error.response?.status === 401) {
      console.log('API 401 error:', error.config?.url);
      
      // Prevent infinite retry loop
      if (error.config._retryCount) {
        console.log('Already retried once, not retrying again');
        setApiToken(null);
        if (!isOnLoginPage() && !isOnPublicPage()) {
          console.log('Redirecting to login due to repeated 401');
          safeRedirect('/login');
        }
        return Promise.reject(error);
      }
      
      // Try to refresh token first
      try {
        // For now, just clear auth and redirect instead of complex refresh logic
        console.log('Token expired, clearing auth and redirecting');
        setApiToken(null);
        
        // Clear auth from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-store');
          // Dispatch logout event
          window.dispatchEvent(new CustomEvent('auth-logout'));
        }
        
        if (!isOnLoginPage() && !isOnPublicPage()) {
          safeRedirect('/login');
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        setApiToken(null);
        if (!isOnLoginPage() && !isOnPublicPage()) {
          safeRedirect('/login');
        }
      }
    }
    
    // Handle network errors gracefully
    if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
      console.warn('Network error detected:', error.message);
      error.isNetworkError = true;
    }
    
    return Promise.reject(error);
  }
);

export default api; 