// lib/auth-utils.ts

/**
 * Utility untuk menangani auth state dan mencegah redirect loops
 */

// Flag untuk mencegah multiple redirect attempts
let isRedirecting = false;

export const safeRedirect = (path: string) => {
  if (typeof window === 'undefined') return;
  
  if (isRedirecting) {
    console.log('Redirect sudah dalam proses, dibatalkan');
    return;
  }
  
  isRedirecting = true;
  
  // Reset flag setelah redirect
  setTimeout(() => {
    isRedirecting = false;
  }, 1000);
  
  window.location.href = path;
};

export const resetRedirectFlag = () => {
  isRedirecting = false;
};

// Cek apakah sedang dalam proses redirect
export const isCurrentlyRedirecting = () => {
  return isRedirecting;
};

// Cek apakah user sedang di halaman login
export const isOnLoginPage = () => {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.includes('/login') || window.location.pathname.includes('/signup');
};

// Cek apakah user sedang di halaman public
export const isOnPublicPage = () => {
  if (typeof window === 'undefined') return false;
  const publicPaths = ['/', '/products', '/group-buy', '/login', '/signup'];
  return publicPaths.some(path => window.location.pathname === path || window.location.pathname.startsWith(path + '/'));
}; 