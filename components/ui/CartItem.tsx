'use client';
import { Trash2 } from 'lucide-react';
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore';
import QuantityStepper from './QuantityStepper';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-xl"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-[#1F2937] mb-1">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{item.store}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#1F2937]">
              ${item.price.toFixed(2)}
            </span>
            <div className="flex items-center space-x-3">
              <QuantityStepper
                quantity={item.quantity}
                onQuantityChange={handleQuantityChange}
                min={1}
                size="sm"
              />
              <button
                onClick={handleRemove}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}