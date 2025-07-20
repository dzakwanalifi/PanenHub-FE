// =============================================================================
// PANENHUB CONSTANTS & UTILITIES
// =============================================================================

// -----------------------------------------------------------------------------
// Currency & Localization
// -----------------------------------------------------------------------------
export const CURRENCY_SYMBOL = 'Rp';
export const CURRENCY_CODE = 'IDR';
export const LOCALE = 'id-ID';

// Currency formatting with proper Indonesian localization
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price); // Remove * 1000 multiplication
};

// Alternative formatting for simple display
export const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const formatPriceRange = (minPrice: number, maxPrice: number): string => {
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

// -----------------------------------------------------------------------------
// Application Configuration
// -----------------------------------------------------------------------------
export const APP_CONFIG = {
  name: 'PanenHub',
  description: 'Marketplace hasil panen segar yang menghubungkan petani dan konsumen',
  version: '1.0.0',
  
  // Pagination
  productsPerPage: 12,
  ordersPerPage: 10,
  messagesPerPage: 20,
  
  // Limits
  maxCartItems: 50,
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxImagesPerProduct: 5,
  
  // Thresholds (in IDR thousands)
  freeShippingThreshold: 50.00,
  minimumOrderAmount: 5.00,
  maximumOrderAmount: 1000.00,
  
  // Contact
  supportEmail: 'support@panenhub.com',
  businessWhatsApp: '+62812345678',
} as const;

// -----------------------------------------------------------------------------
// Theme Colors
// -----------------------------------------------------------------------------
export const COLORS = {
  primary: '#2E7D32',      // Dark green
  primaryLight: '#A5D6A7',  // Light green
  primaryDark: '#1B5E20',   // Darker green
  secondary: '#FFC107',     // Amber/Warning
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const;

// -----------------------------------------------------------------------------
// Validation Rules
// -----------------------------------------------------------------------------
export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Masukkan alamat email yang valid',
  },
  phone: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
    minLength: 10,
    maxLength: 15,
    message: 'Masukkan nomor telepon yang valid',
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: 'Password minimal 8 karakter dengan huruf besar, kecil, dan angka',
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Nama hanya boleh berisi huruf dan spasi',
  },
  price: {
    min: 0.01,
    max: 9999.99,
    message: 'Harga harus antara Rp 10 dan Rp 9.999.990',
  },
} as const;

// -----------------------------------------------------------------------------
// Date & Time Formatting
// -----------------------------------------------------------------------------
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(dateObj);
};

// -----------------------------------------------------------------------------
// Number Formatting
// -----------------------------------------------------------------------------
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat(LOCALE).format(num);
};

export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat(LOCALE, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};

export const formatPercentage = (value: number, total: number): string => {
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};

// -----------------------------------------------------------------------------
// Text Formatting
// -----------------------------------------------------------------------------
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// -----------------------------------------------------------------------------
// Status & Badge Configurations
// -----------------------------------------------------------------------------
export const ORDER_STATUS = {
  pending: { label: 'Menunggu', color: COLORS.warning, bgColor: '#FEF3C7' },
  confirmed: { label: 'Dikonfirmasi', color: COLORS.info, bgColor: '#DBEAFE' },
  processing: { label: 'Diproses', color: COLORS.info, bgColor: '#DBEAFE' },
  shipped: { label: 'Dikirim', color: COLORS.primary, bgColor: '#D1FAE5' },
  delivered: { label: 'Diterima', color: COLORS.success, bgColor: '#D1FAE5' },
  cancelled: { label: 'Dibatalkan', color: COLORS.error, bgColor: '#FEE2E2' },
} as const;

export const PAYMENT_STATUS = {
  pending: { label: 'Menunggu', color: COLORS.warning },
  paid: { label: 'Lunas', color: COLORS.success },
  failed: { label: 'Gagal', color: COLORS.error },
  refunded: { label: 'Dikembalikan', color: COLORS.info },
} as const;

// -----------------------------------------------------------------------------
// API Endpoints (for future backend integration)
// -----------------------------------------------------------------------------
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    forgot: '/api/auth/forgot-password',
    reset: '/api/auth/reset-password',
  },
  products: {
    list: '/api/products',
    detail: '/api/products/:id',
    create: '/api/products',
    update: '/api/products/:id',
    delete: '/api/products/:id',
    search: '/api/products/search',
  },
  orders: {
    list: '/api/orders',
    detail: '/api/orders/:id',
    create: '/api/orders',
    update: '/api/orders/:id',
    cancel: '/api/orders/:id/cancel',
  },
  cart: {
    get: '/api/cart',
    add: '/api/cart/add',
    update: '/api/cart/update',
    remove: '/api/cart/remove',
    clear: '/api/cart/clear',
  },
  payment: {
    process: '/api/payment/process',
    verify: '/api/payment/verify',
    refund: '/api/payment/refund',
  },
} as const;

// -----------------------------------------------------------------------------
// Validation Functions
// -----------------------------------------------------------------------------
export const validateEmail = (email: string): boolean => {
  return VALIDATION.email.pattern.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION.phone.pattern.test(phone) && 
         phone.length >= VALIDATION.phone.minLength && 
         phone.length <= VALIDATION.phone.maxLength;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION.password.minLength && 
         VALIDATION.password.pattern.test(password);
};

export const validatePrice = (price: number): boolean => {
  return price >= VALIDATION.price.min && price <= VALIDATION.price.max;
};

// -----------------------------------------------------------------------------
// Local Storage Keys
// -----------------------------------------------------------------------------
export const STORAGE_KEYS = {
  cartItems: 'panenhub-cart',
  favorites: 'panenhub-favorites',
  authToken: 'panenhub-auth-token',
  userPreferences: 'panenhub-preferences',
  recentlyViewed: 'panenhub-recent-products',
} as const;

// Placeholder image for products without images
export const PLACEHOLDER_PRODUCT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Y2EzYWYiPgogICAgTm8gSW1hZ2UgQXZhaWxhYmxlCiAgPC90ZXh0PgogIDx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2YjcyODAiPgogICAgw4/igJnwn6WsCiAgPC90ZXh0Pgo8L3N2Zz4K';