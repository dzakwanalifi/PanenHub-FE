'use client';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import PullToRefresh from '@/components/ui/PullToRefresh';
import FeaturedProductsSection from '@/components/sections/home/FeaturedProductsSection';

interface HomePageWrapperProps {
  selectedCategory: string;
  searchTerm: string;
}

export default function HomePageWrapper({ selectedCategory, searchTerm }: HomePageWrapperProps) {
  const { fetchCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = async () => {
    try {
      // Refresh cart if user is logged in
      if (isLoggedIn) {
        await fetchCart();
      }
      
      // Trigger re-render of products
      setRefreshKey(prev => prev + 1);
      
      // Add small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <FeaturedProductsSection 
        key={refreshKey}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
      />
    </PullToRefresh>
  );
}
