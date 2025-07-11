'use client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#A5D6A7] text-[#1F2937] hover:bg-[#B9E4C9] focus:ring-[#A5D6A7] rounded-full',
    secondary: 'bg-[#F3F4F6] text-[#1F2937] hover:bg-gray-200 focus:ring-gray-300 rounded-lg',
    outline: 'border border-gray-300 bg-white text-[#1F2937] hover:bg-[#F3F4F6] focus:ring-gray-300 rounded-lg',
    ghost: 'text-[#1F2937] hover:bg-[#F3F4F6] focus:ring-gray-300 rounded-lg',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}