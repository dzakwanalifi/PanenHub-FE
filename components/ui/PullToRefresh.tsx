'use client';
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
}

export default function PullToRefresh({ 
  onRefresh, 
  children, 
  threshold = 100 
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only start pull if at top of page
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === 0 || window.scrollY > 0) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 0) {
      setIsPulling(true);
      setPullDistance(Math.min(distance, threshold * 1.5));
      
      // Prevent default scrolling behavior
      e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }

    // Reset states
    setIsPulling(false);
    setPullDistance(0);
    setStartY(0);
  };

  const pullProgress = Math.min(pullDistance / threshold, 1);
  const shouldTrigger = pullDistance >= threshold;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden"
    >
      {/* Pull indicator */}
      {(isPulling || isRefreshing) && (
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-center bg-gradient-to-b from-green-50 to-transparent transition-all duration-200 ease-out z-10"
          style={{
            height: `${Math.max(pullDistance, isRefreshing ? 80 : 0)}px`,
            opacity: isPulling || isRefreshing ? 1 : 0,
          }}
        >
          <div className="flex flex-col items-center py-4">
            <div
              className={`transition-transform duration-200 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              style={{
                transform: `rotate(${pullProgress * 360}deg)`,
              }}
            >
              <RefreshCw
                className={`w-6 h-6 transition-colors duration-200 ${
                  shouldTrigger || isRefreshing
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              />
            </div>
            <p
              className={`text-sm mt-2 transition-colors duration-200 ${
                shouldTrigger || isRefreshing
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}
            >
              {isRefreshing
                ? 'Memperbarui...'
                : shouldTrigger
                ? 'Lepaskan untuk memperbarui'
                : 'Tarik ke bawah untuk memperbarui'}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translateY(${isPulling || isRefreshing ? Math.max(pullDistance, isRefreshing ? 80 : 0) : 0}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
