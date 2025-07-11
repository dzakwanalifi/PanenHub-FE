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
    <div className="card-flat p-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-dark mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.store}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#A5D6A7]">
              ${item.price.toFixed(2)}
            </span>
            <QuantityStepper
              quantity={item.quantity}
              onQuantityChange={handleQuantityChange}
              size="sm"
            />
          </div>
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}