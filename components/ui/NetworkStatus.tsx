'use client';
import { useEffect, useState } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface NetworkStatusProps {
  className?: string;
}

export default function NetworkStatus({ className = '' }: NetworkStatusProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      // Hide status after 3 seconds
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (!showStatus && isOnline) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
    >
      <div
        className={`flex items-center px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
          isOnline
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Kembali online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Tidak ada koneksi</span>
            <button
              onClick={handleRetry}
              className="ml-3 p-1 hover:bg-white/20 rounded"
              title="Coba lagi"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
