'use client';
import { MapPin, Search, Bell, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { useLocationStore } from '@/store/locationStore';
import LocationSelectorModal from '@/components/ui/LocationSelectorModal';

export default function HeroSection() {
  const { deliveryMode, setDeliveryMode } = useDeliveryStore();
  const { currentLocation } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <section className="bg-white px-4 py-6">
      {/* Header with Location and Actions */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center space-x-2 hover:bg-[#F3F4F6] p-2 rounded-lg transition-colors"
        >
          <MapPin className="w-5 h-5 text-[#1F2937]" />
          <div>
            <p className="text-sm text-gray-500">Delivery location</p>
            <p className="font-semibold text-[#1F2937]">{currentLocation.name}</p>
          </div>
        </button>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-[#1F2937] hover:text-[#A5D6A7] transition-colors">
            <Search className="w-6 h-6" />
          </button>
          <button className="p-2 text-[#1F2937] hover:text-[#A5D6A7] transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Delivery/Pickup Toggle */}
      <div className="mb-8">
        <div className="bg-[#F3F4F6] rounded-full p-1 inline-flex">
          <button
            onClick={() => setDeliveryMode('delivery')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              deliveryMode === 'delivery'
                ? 'bg-white text-[#1F2937] shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Delivery</span>
          </button>
          <button
            onClick={() => setDeliveryMode('pickup')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              deliveryMode === 'pickup'
                ? 'bg-white text-[#1F2937] shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Pickup</span>
          </button>
        </div>
      </div>

      {/* Debug: Current Mode Display */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          Current Mode: <span className="font-semibold capitalize">{deliveryMode}</span>
        </p>
      </div>

      {/* Location Selector Modal */}
      <LocationSelectorModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </section>
  );
}