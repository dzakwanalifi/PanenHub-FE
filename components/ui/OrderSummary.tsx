'use client';
import { useCartStore } from '@/store/cartStore';
import Button from './Button';
import Link from 'next/link';
import { formatPrice } from '@/lib/constants';

export default function OrderSummary() {
  const { items, getTotal } = useCartStore();
  
  const subtotal = getTotal();
  const deliveryFee = 2.00;
  const discount = subtotal * 0.05; // 5% discount
  const total = subtotal + deliveryFee - discount;

  if (items.length === 0) {
    return null;
  }

  return (
          <span className="font-semibold">{formatPrice(subtotal)}</span>
      <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[#1F2937]">Subtotal</span>
          <span className="font-semibold text-[#1F2937]">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-[#1F2937]">Delivery Fee</span>
            <span className="font-semibold text-[#1F2937]">${deliveryFee.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-[#1F2937]">Discount</span>
            <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
          </div>
        </div>
          <span className="font-semibold">{formatPrice(shipping)}</span>
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-[#1F2937]">Total</span>
            <span className="font-bold text-[#1F2937]">${total.toFixed(2)}</span>
          <span className="font-bold text-[#2E7D32]">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/checkout">
          <Button className="w-full" size="lg">
            Buy Now
          </Button>
        </Link>
      </div>
    </div>
  );
}