'use client';
import { useCartStore } from '@/store/cartStore';
import Button from './Button';
import Link from 'next/link';

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
    <div className="card-flat p-6">
      <h3 className="text-lg font-semibold text-dark mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-dark">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-semibold text-dark">${deliveryFee.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Discount</span>
            <span className="font-semibold text-[#A5D6A7]">5%</span>
          </div>
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-3">
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-dark">Total</span>
            <span className="font-bold text-dark">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link href="/checkout">
        <Button className="w-full" size="lg">
          Buy Now
        </Button>
      </Link>
    </div>
  );
}