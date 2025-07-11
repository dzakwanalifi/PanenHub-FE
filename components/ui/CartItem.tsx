'use client';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore';
import { formatPrice } from '@/lib/constants';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.cartItemId);
    } else {
      updateQuantity(item.cartItemId, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.store}</p>
        <p className="text-lg font-bold text-[#2E7D32] mt-1">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center space-x-3">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          
          <span className="w-8 text-center font-medium text-gray-900">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right min-w-[80px]">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItem(item.cartItemId)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}