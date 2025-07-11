import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

export default function Avatar({ 
  src, 
  alt, 
  size = 'md', 
  className,
  fallback 
}: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'Avatar'}
        className={cn(
          'rounded-full object-cover',
          sizes[size],
          className
        )}
      />
    );
  }
  
  return (
    <div
      className={cn(
        'rounded-full bg-gray-100 flex items-center justify-center',
        sizes[size],
        className
      )}
    >
      {fallback ? (
        <span className="text-gray-600 font-medium text-sm">
          {fallback.charAt(0).toUpperCase()}
        </span>
      ) : (
        <User className={cn('text-gray-400', iconSizes[size])} />
      )}
    </div>
  );
}