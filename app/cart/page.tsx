'use client';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/ui/CartItem';
import OrderSummary from '@/components/ui/OrderSummary';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/"
            className="bg-[#2E7D32] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1B5E20] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32 md:pb-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={`${item.id}-${Math.random()}`} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="hidden lg:block lg:col-span-1">
          <OrderSummary />
        </div>
      </div>

      {/* Mobile Sticky Order Summary */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="px-4 py-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}