'use client';
import { Trash2 } from 'lucide-react';
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore';
import QuantityStepper from './QuantityStepper';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (quantity: number) => {
    updateQuantity(item.id, quantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.store}</p>
          <p className="text-lg font-bold text-[#2E7D32]">
            ${item.price.toFixed(2)} /kg
          </p>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <QuantityStepper
            quantity={item.quantity}
            onQuantityChange={handleQuantityChange}
            min={1}
          />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-bold text-lg text-[#2E7D32]">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}