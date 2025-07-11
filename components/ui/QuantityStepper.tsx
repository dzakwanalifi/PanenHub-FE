'use client';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({ quantity, onQuantityChange, min = 0, max = 99 }: QuantityStepperProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
      
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center hover:bg-[#1B5E20] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}