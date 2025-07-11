'use client';
import { MapPin } from 'lucide-react';

interface StoreLocationMapProps {
  storeName: string;
  address: string;
}

export default function StoreLocationMap({ storeName, address }: StoreLocationMapProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Lokasi Toko</h3>
      
      {/* Static Map Container */}
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-3 overflow-hidden">
        {/* Mock map background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`border border-gray-300 ${
                  Math.random() > 0.7 ? 'bg-green-300' : ''
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Center Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="w-8 h-8 text-red-500 fill-current drop-shadow-lg" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Mock roads */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 opacity-60"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-400 opacity-60"></div>
        
        {/* Store label */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow-lg">
          <p className="text-sm font-medium text-gray-900">{storeName}</p>
        </div>
      </div>
      
      {/* Address Info */}
      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-gray-900">{storeName}</p>
          <p className="text-sm text-gray-600">{address}</p>
          <button className="text-sm text-[#2E7D32] hover:text-[#1B5E20] font-medium mt-1">
            Lihat di Maps →
          </button>
        </div>
      </div>
    </div>
  );
} 