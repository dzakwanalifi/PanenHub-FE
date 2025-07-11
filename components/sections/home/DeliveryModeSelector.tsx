'use client';
import { MapPin, Truck } from 'lucide-react';
import { useState } from 'react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { useLocationStore } from '@/store/locationStore';
import LocationSelectorModal from '@/components/ui/LocationSelectorModal';

export default function DeliveryModeSelector() {
  const { deliveryMode, setDeliveryMode } = useDeliveryStore();
  const { currentLocation } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <section className="bg-white px-4 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-4">
        {/* Location Display */}
        <button 
          onClick={() => setIsLocationModalOpen(true)}
          aria-label="Change delivery location"
          className="flex items-center space-x-2 hover:bg-[#F3F4F6] p-2 rounded-lg transition-colors"
        >
          <MapPin className="w-4 h-4 text-[#1F2937]" />
          <div className="text-left">
            <p className="text-xs text-gray-500">Delivery to</p>
            <p className="text-sm font-semibold text-[#1F2937]">{currentLocation.name}</p>
          </div>
        </button>

        {/* Delivery/Pickup Toggle */}
        <div className="bg-[#F3F4F6] rounded-full p-1 inline-flex">
          <button
            onClick={() => setDeliveryMode('delivery')}
            aria-label="Select delivery mode"
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center space-x-1 ${
              deliveryMode === 'delivery'
                ? 'bg-white text-[#1F2937] shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <Truck className="w-3 h-3" />
            <span>Delivery</span>
          </button>
          <button
            onClick={() => setDeliveryMode('pickup')}
            aria-label="Select pickup mode"
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center space-x-1 ${
              deliveryMode === 'pickup'
                ? 'bg-white text-[#1F2937] shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <MapPin className="w-3 h-3" />
            <span>Pickup</span>
          </button>
        </div>
      </div>

      {/* Location Selector Modal */}
      <LocationSelectorModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </section>
  );
}