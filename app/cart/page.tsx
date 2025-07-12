'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/ui/CartItem';
import OrderSummary from '@/components/ui/OrderSummary';
import Spinner from '@/components/ui/Spinner';
import Link from 'next/link';
import { ShoppingBag, AlertCircle } from 'lucide-react';

export default function CartPage() {
  const { cart, isLoading, error, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Spinner />
            <p className="mt-4 text-gray-600">Memuat keranjang...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 md:w-24 md:h-24 text-red-300 mx-auto mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-[#1F2937] mb-2">Terjadi Kesalahan</h1>
            <p className="text-gray-500 mb-8 text-sm md:text-base">{error}</p>
            <button
              onClick={fetchCart}
              className="bg-[#A5D6A7] text-[#1F2937] px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-[#B9E4C9] transition-colors text-sm md:text-base"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 md:w-24 md:h-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-[#1F2937] mb-2">Keranjang Anda kosong</h1>
            <p className="text-gray-500 mb-8 text-sm md:text-base">
              Sepertinya Anda belum menambahkan produk apapun ke keranjang.
            </p>
            <Link
              href="/products"
              className="bg-[#A5D6A7] text-[#1F2937] px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-[#B9E4C9] transition-colors text-sm md:text-base"
            >
              Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl md:text-2xl font-bold text-[#1F2937] text-center">
            Keranjang ({cart.items.length})
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-44 lg:pb-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                />
              ))}
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Order Summary */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <OrderSummary isMobile={true} />
        </div>
      </div>
    </div>
  );
}