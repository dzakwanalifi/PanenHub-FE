'use client';
import { useState } from 'react';
import { X, Search, MapPin, Locate } from 'lucide-react';
import { useLocationStore } from '@/store/locationStore';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const savedAddresses = [
  { name: 'Home', address: '123 Main Street, Green Valley' },
  { name: 'Work', address: '456 Business Ave, Downtown' },
  { name: 'Mom\'s House', address: '789 Family Lane, Suburbs' },
];

export default function LocationSelectorModal({ isOpen, onClose }: LocationSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { setCurrentLocation } = useLocationStore();

  const handleLocationSelect = (location: { name: string; address: string }) => {
    setCurrentLocation(location);
    onClose();
  };

  const handleCurrentLocation = () => {
    setCurrentLocation({
      name: 'Current Location',
      address: 'Your current GPS location'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#1F2937]">Select Location</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-[#1F2937]" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for your address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5D6A7] focus:border-transparent"
          />
        </div>
      </div>

      {/* Current Location Option */}
      <div className="px-4 mb-4">
        <button
          onClick={handleCurrentLocation}
          className="w-full flex items-center space-x-3 p-4 bg-[#F3F4F6] rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="w-10 h-10 bg-[#A5D6A7] rounded-full flex items-center justify-center">
            <Locate className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-[#1F2937]">Use my current location</p>
            <p className="text-sm text-gray-600">Get your exact location automatically</p>
          </div>
        </button>
      </div>

      {/* Saved Addresses */}
      <div className="px-4">
        <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Saved Addresses</h3>
        <div className="space-y-3">
          {savedAddresses
            .filter(address => 
              address.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              address.address.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((address, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(address)}
                className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#1F2937]" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-[#1F2937]">{address.name}</p>
                  <p className="text-sm text-gray-600">{address.address}</p>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}