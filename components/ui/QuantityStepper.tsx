'use client';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function QuantityStepper({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = 'md',
}: QuantityStepperProps) {
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

  const sizeClasses = {
    sm: 'h-8 px-3',
    md: 'h-10 px-4',
    lg: 'h-12 px-5',
  };

  const buttonSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex items-center bg-light rounded-full ${sizeClasses[size]}`}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={`${buttonSizeClasses[size]} rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <span className={`flex-1 text-center font-semibold text-dark ${textSizeClasses[size]}`}>
        {quantity}
      </span>
      
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={`${buttonSizeClasses[size]} rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}