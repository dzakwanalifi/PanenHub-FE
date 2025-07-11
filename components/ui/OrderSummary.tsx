'use client';
import { useCartStore } from '@/store/cartStore';

export default function OrderSummary() {
  const { getTotal, items } = useCartStore();
  const subtotal = getTotal();
  const shipping = 2.99;
  const discount = subtotal * 0.05; // 5% discount
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-green-600">
          <span>Discount (5%)</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#2E7D32]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => console.log('Proceed to checkout')}
        disabled={items.length === 0}
        className="w-full bg-[#2E7D32] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1B5E20] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}