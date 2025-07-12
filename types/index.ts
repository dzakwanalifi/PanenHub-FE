// types/index.ts

// Item individual di dalam keranjang
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  unit?: string; // kg, pcs, dll
}

// Objek keranjang secara keseluruhan
export interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

// Interface untuk request API
export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Interface untuk checkout
export interface CheckoutRequest {
  cartId: string;
  addressId: string;
  shippingMethod: string;
  paymentMethod?: string;
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