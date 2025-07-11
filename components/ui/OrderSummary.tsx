'use client';
import { useCartStore } from '@/store/cartStore';
import { calculateServerSideTotal } from '@/lib/utils';
import Button from './Button';
import Link from 'next/link';
import { formatPrice } from '@/lib/constants';

export default function OrderSummary() {
  const { items } = useCartStore();
  
  // Use server-side calculation for authoritative pricing
  const priceData = calculateServerSideTotal(items);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[#1F2937]">Subtotal</span>
          <span className="font-semibold text-[#1F2937]">{formatPrice(priceData.subtotal)}</span>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-[#1F2937]">Shipping</span>
            <span className="font-semibold text-[#1F2937]">
              {priceData.shipping === 0 ? 'Free' : formatPrice(priceData.shipping)}
            </span>
          </div>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-[#1F2937]">Discount</span>
            <span className="font-semibold text-green-600">-{formatPrice(priceData.discount)}</span>
          </div>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-[#1F2937]">Total</span>
            <span className="font-bold text-[#2E7D32]">{formatPrice(priceData.finalTotal)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/checkout">
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}