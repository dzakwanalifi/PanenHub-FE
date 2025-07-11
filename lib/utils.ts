import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Server-side price calculation simulation
export interface CartItem {
  id: string;
  cartItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
}

export interface PriceCalculation {
  subtotal: number;
  shipping: number;
  discount: number;
  finalTotal: number;
}

export const calculateServerSideTotal = (cartItems: CartItem[]): PriceCalculation => {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Server-side business logic for pricing
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const discount = subtotal * 0.05; // 5% discount
  const finalTotal = subtotal + shipping - discount;
  
  return {
    subtotal,
    shipping,
    discount,
    finalTotal
  };
};
