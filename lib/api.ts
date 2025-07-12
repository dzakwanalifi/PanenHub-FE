import axios from 'axios';

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
  (error) => {
    // Handle 401 unauthorized responses
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      setApiToken(null);
      // Note: Don't import useAuthStore here to avoid circular dependency
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api; 