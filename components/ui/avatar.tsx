'use client';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export default function Avatar({ src, alt, size = 'md', fallback, className = '' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt || 'Avatar'}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 64 : 96}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 64 : 96}
          className="object-cover"
        />
      ) : (
        <span className={`font-medium text-gray-600 ${textSizeClasses[size]}`}>
          {getInitials(fallback)}
        </span>
      )}
    </div>
  );
}