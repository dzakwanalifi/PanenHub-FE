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
  size = 'md'
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
    lg: 'h-12 px-5'
  };

  const buttonSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`flex items-center bg-[#F3F4F6] rounded-full ${sizeClasses[size]}`}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={`${buttonSizeClasses[size]} rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Minus className={`${iconSizeClasses[size]} text-[#1F2937]`} />
      </button>
      
      <span className={`flex-1 text-center font-semibold text-[#1F2937] ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}`}>
        {quantity}
      </span>
      
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={`${buttonSizeClasses[size]} rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Plus className={`${iconSizeClasses[size]} text-[#1F2937]`} />
      </button>
    </div>
  );
}