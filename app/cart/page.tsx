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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-24 h-24 text-red-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1F2937] mb-2">Terjadi Kesalahan</h1>
          <p className="text-gray-500 mb-8">{error}</p>
          <button
            onClick={fetchCart}
            className="bg-[#A5D6A7] text-[#1F2937] px-8 py-3 rounded-full font-semibold hover:bg-[#B9E4C9] transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1F2937] mb-2">Keranjang Anda kosong</h1>
          <p className="text-gray-500 mb-8">
            Sepertinya Anda belum menambahkan produk apapun ke keranjang.
          </p>
          <Link
            href="/products"
            className="bg-[#A5D6A7] text-[#1F2937] px-8 py-3 rounded-full font-semibold hover:bg-[#B9E4C9] transition-colors"
          >
            Lanjut Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-8 text-center">Keranjang</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32 md:pb-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItem 
              key={item.id} 
              item={{
                id: item.productId,
                cartItemId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.imageUrl || '/placeholder-product.jpg',
                store: 'PanenHub' // Default store name atau bisa diambil dari data produk
              }} 
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="hidden lg:block lg:col-span-1">
          <OrderSummary />
        </div>
      </div>

      {/* Mobile Sticky Order Summary */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 z-40 bg-white border-t border-gray-200">
        <div className="px-4 py-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}