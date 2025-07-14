'use client';
import { useCartStore } from '@/store/cartStore';
import Button from './Button';
import Link from 'next/link';
import { formatPrice } from '@/lib/constants';

interface OrderSummaryProps {
  isMobile?: boolean;
  shippingCost?: number;
  showShipping?: boolean;
}

export default function OrderSummary({ isMobile = false, shippingCost = 0, showShipping = false }: OrderSummaryProps) {
  const { cart } = useCartStore();
  
  if (!cart || cart.items.length === 0) {
    return null;
  }

  // Use the total from API response (which should be authoritative)
  const subtotal = cart.total_price;
  const shipping = showShipping ? shippingCost : 0;
  const discount = 0; // No discount for now
  const finalTotal = subtotal + shipping;

  // Mobile compact version
  if (isMobile) {
    return (
      <div className="bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-600">
              {cart.items.length} item{cart.items.length > 1 ? 's' : ''}
            </span>
            <div className="text-lg font-bold text-[#2E7D32]">
              {formatPrice(finalTotal)}
            </div>
          </div>
          <Link href="/checkout" className="flex-shrink-0">
            <Button className="px-8 py-3 text-base font-semibold" size="lg">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Desktop full version
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Ringkasan Pesanan</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[#1F2937]">Subtotal</span>
          <span className="font-semibold text-[#1F2937]">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-[#1F2937]">Ongkos Kirim</span>
            <span className="font-semibold text-[#1F2937]">
              {showShipping ? (shipping === 0 ? 'Gratis' : formatPrice(shipping)) : 'Pilih metode pengiriman'}
            </span>
          </div>
        </div>
        
        {/* Only show discount section if there's actually a discount */}
        {discount > 0 && (
          <div className="border-t border-dashed border-gray-300 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-[#1F2937]">Diskon</span>
              <span className="font-semibold text-green-600">-{formatPrice(discount)}</span>
            </div>
          </div>
        )}
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-[#1F2937]">Total</span>
            <span className="font-bold text-[#2E7D32]">{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/checkout">
          <Button className="w-full" size="lg">
            Lanjut ke Pembayaran
          </Button>
        </Link>
      </div>
    </div>
  );
}