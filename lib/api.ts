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
        const { useAuthStore } = await import('@/store/authStore');
        const refreshSuccess = await useAuthStore.getState().refreshToken();
        
        if (refreshSuccess) {
          console.log('Token refreshed successfully, retrying request');
          // Get the new token and set it to the retry request
          const newToken = useAuthStore.getState().token;
          if (newToken) {
            // Ensure the retry request uses the new token
            if (!error.config.headers) {
              error.config.headers = {};
            }
            error.config.headers.Authorization = `Bearer ${newToken}`;
            console.log('Retrying with new token:', newToken.substring(0, 20) + '...');
            
            // Mark this request as retried
            error.config._retryCount = 1;
          }
          // Retry the original request with new token
          return api(error.config);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }
      
      // Clear token if refresh failed
      setApiToken(null);
      
      // Only redirect if we're not already on login page and not on public pages
      if (!isOnLoginPage() && !isOnPublicPage()) {
        console.log('Redirecting to login due to 401');
        safeRedirect('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api; 