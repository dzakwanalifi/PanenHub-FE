// types/index.ts

// Tipe untuk data produk yang ada di dalam item keranjang
interface CartProduct {
  id: string;
  title: string;
  price: number;
  unit: string;
  store_id: string;
  // Tambahkan image_urls jika ada dan diperlukan di UI keranjang
  image_urls?: string[];
  store: {
    store_name: string;
  };
}

// Tipe untuk item individual di dalam keranjang
export interface CartItem {
  id: string;       // ID dari item keranjang itu sendiri (cart_item_id)
  product_id: string;
  quantity: number;
  product: CartProduct; // Objek produk yang di-nest
}

// Tipe untuk objek keranjang secara keseluruhan
export interface Cart {
  items: CartItem[];
  total_price: number;
}

// Interface untuk request API
export interface AddToCartRequest {
  product_id: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Interface untuk checkout
export interface CheckoutRequest {
  payment_method: string;
}

// Interface untuk alamat pengiriman
export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

// Interface untuk metode pengiriman
export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'draft' | 'out_of_stock';
  images: string[];
  sales: number;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  images: string[];
} 