'use client';
import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, MapPin } from 'lucide-react';
import Button from './Button';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

export interface FilterOptions {
  distance: 'any' | 'under1' | '1to3' | '3to5';
  category: string;
  priceRange: [number, number];
  rating: number;
}

export default function FilterPanel({ isOpen, onClose, onApplyFilters, initialFilters }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  // Update local filters when initialFilters changes
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const distanceOptions = [
    { value: 'any', label: 'Semua Jarak', description: 'Tampilkan semua produk' },
    { value: 'under1', label: '< 1 km', description: 'Sangat dekat' },
    { value: '1to3', label: '1-3 km', description: 'Cukup dekat' },
    { value: '3to5', label: '3-5 km', description: 'Masih terjangkau' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'Sayuran', label: 'Sayuran' },
    { value: 'Buah-buahan', label: 'Buah-buahan' },
    { value: 'Biji-bijian', label: 'Biji-bijian' },
    { value: 'Susu & Olahan', label: 'Susu & Olahan' },
    { value: 'Organik', label: 'Organik' },
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      distance: 'any',
      category: 'all',
      priceRange: [0, 200],
      rating: 0,
    };
    setFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <SlidersHorizontal className="w-5 h-5 mr-2 text-[#2E7D32]" />
            <h2 className="text-xl font-semibold">Filter Produk</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-full pb-32">
          {/* Distance Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-[#2E7D32]" />
              Filter Berdasarkan Jarak
            </h3>
            <div className="space-y-3">
              {distanceOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    filters.distance === option.value
                      ? 'border-[#2E7D32] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="distance"
                    value={option.value}
                    checked={filters.distance === option.value}
                    onChange={(e) => setFilters({ ...filters, distance: e.target.value as any })}
                    className="w-4 h-4 text-[#2E7D32] border-gray-300 focus:ring-[#2E7D32]"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategori</h3>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rentang Harga</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      priceRange: [Number(e.target.value), filters.priceRange[1]] 
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Maksimum</label>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      priceRange: [filters.priceRange[0], Number(e.target.value)] 
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                    placeholder="200"
                  />
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">
                Rp {filters.priceRange[0].toLocaleString()} - Rp {filters.priceRange[1].toLocaleString()}
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rating Minimum</h3>
            <div className="space-y-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.rating === rating}
                    onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                    className="w-4 h-4 text-[#2E7D32] border-gray-300 focus:ring-[#2E7D32]"
                  />
                  <span className="ml-3">
                    {rating === 0 ? 'Semua Rating' : `${rating}+ Bintang`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="flex-1"
              onClick={handleApply}
            >
              Terapkan Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 