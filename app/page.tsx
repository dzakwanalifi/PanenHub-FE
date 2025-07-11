'use client';
import { useState } from 'react';
import HeroSection from '@/components/sections/home/HeroSection';
import DeliveryModeSelector from '@/components/sections/home/DeliveryModeSelector';
import CategoriesSection from '@/components/sections/home/CategoriesSection';
import FeaturedProductsSection from '@/components/sections/home/FeaturedProductsSection';
import NearbyFreshSection from '@/components/sections/home/NearbyFreshSection';
import SearchBar from '@/components/ui/SearchBar';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <HeroSection />
      
      <DeliveryModeSelector />
      
      {/* Search Bar */}
      <div className="px-4">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Cari produk segar..."
        />
      </div>
      
      <CategoriesSection 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      
      <NearbyFreshSection />
      
      <FeaturedProductsSection 
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
      />
    </div>
  );
}