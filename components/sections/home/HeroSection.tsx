'use client';
import { MapPin, Search, Bell } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HeroSection() {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <section className="bg-white px-4 py-6">
      {/* Header with Location and Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm text-gray-600">Delivery location</p>
            <p className="font-semibold text-dark">Green Valley Point</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-[#A5D6A7] transition-colors">
            <Search className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-[#A5D6A7] transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Delivery/Pickup Toggle */}
      <div className="mb-8">
        <div className="bg-light rounded-full p-1 inline-flex">
          <button
            onClick={() => setDeliveryMode('delivery')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              deliveryMode === 'delivery'
                ? 'bg-white text-dark shadow-sm'
                : 'text-gray-600'
            }`}
          >
            🚚 Delivery
          </button>
          <button
            onClick={() => setDeliveryMode('pickup')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              deliveryMode === 'pickup'
                ? 'bg-white text-dark shadow-sm'
                : 'text-gray-600'
            }`}
          >
            🏪 Pickup
          </button>
        </div>
      </div>
    </section>
  );
}